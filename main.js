define([
    'base/js/namespace',
    'base/js/events'
], function (Jupyter, events) {

    const openAiKey = "YOUR-OPENAI-API-KEY";

    const sysPrompt_askGPT = "You are a helpful agent which returns responses to the given user query formatted as markdown.";
    const sysPrompt_analystGPT = "You are a helpful agent that generates appropriate code for the given task and returns responses formatted as a markdown code fence containing the required Python code. Only return the resulting code in a Python code fence without any additional text comments or explanations.";

    function removePythonCodeFence(markdownText) {
        const fenceRegex = new RegExp(`\`\`\`python\\s*(?:\\r?\\n)+([\\s\\S]*?)\n?\`\`\``);
        const match = markdownText.match(fenceRegex);
        if (match) {
            return match[1];
        } else {
            return markdownText;
        }
    }

    async function askGPT(userPrompt, sysPrompt) {
        const response = await fetch(`https://api.openai.com/v1/chat/completions`, {
            method: "POST",
            body: JSON.stringify({
                "model": "gpt-3.5-turbo",
                "messages": [
                    { role: 'system', content: sysPrompt },
                    { role: 'user', content: userPrompt }
                ],
                "temperature": 0,
                // "max_tokens": 2000,
            }),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${openAiKey}`,
            },
        });

        return response.json();
    }

    // asks ChatGPT for a response based on the contents of the cell (question)
    var ask_chatGPT = async function () {
        const question = Jupyter.notebook.get_selected_cell().get_text();

        // ask ChatGPT
        Jupyter.notebook.insert_cell_below('markdown').set_text("please wait ...");
        const result = await askGPT(question, sysPrompt_askGPT);
        Jupyter.notebook.delete_cell(Jupyter.notebook.get_selected_index() + 1);
        const answer = result.choices[0]['message']['content'];

        // logic for format/modify the answer futher
        let newAnswer = answer;

        // add a new cell below and display the response from ChatGPT
        Jupyter.notebook.insert_cell_below("markdown").set_text(newAnswer);
        Jupyter.notebook.execute_cell_and_select_below();
        Jupyter.notebook.execute_cell_and_select_below();
    }

    // asks ChatGPT to generate the code based on the contents of the cell (question) and the context - contents of the code cell preceeding the current cell
    var ask_analystGPT = async function () {
        // build context - all the code in the code cells present above
        const index = Jupyter.notebook.get_selected_index();
        const contextStartIndex = 0;
        const contextEndIndex = index - 1;
        let codeContent = "";
        for (let i = contextStartIndex; i <= contextEndIndex; i++) {
            const cell = Jupyter.notebook.get_cell(i);
            if (cell.cell_type === "code") {
                codeContent += Jupyter.notebook.get_cell(i).get_text() + "\n"
            }
        }

        const context = "```python\n" + codeContent + "```";

        // user question
        const question = Jupyter.notebook.get_cell(index).get_text();

        // prompt
        const userPrompt = "Context:The following code has already been executed.\n\n" + context + "\n\n" + "Task:Write additional code to accomplish the follwowing task\n\n" + question;

        // ask ChatGPT
        Jupyter.notebook.insert_cell_below('markdown').set_text("please wait ...");
        const result = await askGPT(userPrompt, sysPrompt_analystGPT);
        Jupyter.notebook.delete_cell(Jupyter.notebook.get_selected_index() + 1);
        const answer = result.choices[0]['message']['content'];

        // extract the code from the markdown codefence
        let newAnswer = removePythonCodeFence(answer);

        // add a new cell below and display the response from ChatGPT
        Jupyter.notebook.insert_cell_below("code").set_text(newAnswer);
        Jupyter.notebook.execute_cell_and_select_below();
        Jupyter.notebook.execute_cell_and_select_below();
    }

    // Button to ask ChatGPT
    var chatGPTCellButton = function () {
        Jupyter.toolbar.add_buttons_group([
            Jupyter.keyboard_manager.actions.register({
                'help': 'Ask ChatGPT',
                'icon': 'fa fa-lightbulb-o',
                'handler': ask_chatGPT
            }, 'ask-chatgpt-cell', 'Ask ChatGPT')
        ])
    }

    // Button to generate code via ChatGPT
    var analystGPTCellButton = function () {
        Jupyter.toolbar.add_buttons_group([
            Jupyter.keyboard_manager.actions.register({
                'help': 'Ask AnalystGPT',
                'icon': 'fa fa-code',
                'handler': ask_analystGPT
            }, 'ask-analystgpt-cell', 'Ask AnalystGPT')
        ])
    }


    function load_ipython_extension() {
        chatGPTCellButton();
        analystGPTCellButton();

    }
    return {
        load_ipython_extension: load_ipython_extension
    };
});
