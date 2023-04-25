## JupyterGPT

A Jupyter Notebook extension that let's you use chatGPT inside your Jupyter Notebooks. The extension offers two functionalities -
1. **Ask ChatGPT** 
![Ask ChatGPT Demo](assets/ask_chatgpt_demo_720p.gif)
- Ask any question to chatGPT and it will give you the response in a markdown cell below. 
- Useful for general purpose queries, for example, "what is the difference between precision and recall?", "name the recent five US Presidents", etc.
- To use this, type your question in a markdown cell and then click the "Ask ChatGPT" button (indicated by a lightbulb) in the toolbar.

2. **Ask AnalystGPT** 
![Ask AnalystGPT Demo](assets/ask_analystgpt_demo_720p.gif)
- Use this for data analysis tasks (or tasks that require some code execution). Ask the question to chatGPT and it will return and execute the resulting code in a code cell below. 
- Useful for code generation and data analysis queries, for example, "read the 'Iris.csv' file and show the first 7 rows", "plot a histogram of the values in the Height column", etc.
- To use this, type your question in a markdown cell and then click the "Ask AnalystGPT" button (indicated by coding angular brackets) in the toolbar.


### Installation

Use the following steps to install the plugin in your Jupyter Notebook. This is assuming that you already have Jupyter Notebook installed. If not, please install Jupyter Notebook first.  
Also, if you want this extension in a specific virtual environment, create (if not already created) and activate that environment and then proceed with the below steps.

#### Step 1 - Install `jupyter_contrib_nbextensions`
The `jupyter_contrib_nbextensions` module can be [installed using pip or conda](https://jupyter-contrib-nbextensions.readthedocs.io/en/latest/install.html).  

To install it via pip, use the following command
```
pip install jupyter_contrib_nbextensions
```

To install it via conda, use the following command
```
conda install -c conda-forge jupyter_contrib_nbextensions
```


#### Step 2 - Locate the `nbextensions` folders
Use the following command to get the location of the `jupyter_contrib_nbextensions` package installed in the previous step.
```
pip show jupyter_contrib_nbextensions
```  

For example, it will give you a path something like */Users/piyush/miniforge3/envs/dsp/lib/python3.8/site-packages*  
At this path, you'll find the `jupyter_contrib_nbextensions` directory inside which is the `nbextensions` directory that you need to navigate to.  

This the path for the `nbextensions` folder in your machine would be similar to */Users/piyush/miniforge3/envs/dsp/lib/python3.8/site-packages/jupyter_contrib_nbextensions/nbextensions*  

Navigate inside this folder and you'll see a number community contributed extensions that you can use in your Jupyter Notebook.


#### Step 3 - Download `JupyterGPT` from GitHub
Navigate to the JupyterGPT repo on GitHub and download it's contents. 
- Click of the green "Code" button and then click "Download Zip", this is download a zip file.
- Unizip the download zip file and you'll have your local copy of JupyterGPT

#### Step 4 - Add your OpenAI API key
JupyterGPT uses OpenAI's ChatGPT api. To use it, you will have to put in your own Open AI api key. Navigate to [OpenAI's portal](https://platform.openai.com/account/api-keys) to get your API key. If you don't have your own API key, follow the instructions on their portal to create one.

Now, open the `main.js` file in the `jupyterGPT` folder downloaded in the previous step and replace "YOUR-OPENAI-API-KEY" with your own api key as a string in the line
```js
const openAiKey = "YOUR-OPENAI-API-KEY"
```

Save and close the file.

#### Step 5 - Copy the `jupyterGPT` folder to the `nbextensions` folder
Copy the `jupyterGPT` folder to the `nbextensions` folder located in Step 2. The `nbextensions` folder should now have the `jupyterGPT` folder.

#### Step 6 - Install and activate `jupyterGPT`
You have now copied the `jupyterGPT` extension to `nbextensions` folder but you still need to install and activate this extension to be able to actually use it inside your Jupyter Notebook environment. 

- Open the terminal or the command prompt and navigate to the `nbextensions` folder located in step 2.
- Use the command `sudo jupyter nbextension install jupyterGPT` to install the extension.
- Then, use the command `jupyter nbextension enable jupyterGPT/main` to enable the extension.

Note that if you are making further changes to the above extension, you need to install the activate the extension again using the above to commands for the changes to take effect.

Now, open a Jupyter Notebook, if the installation was successful, you'll see to additional buttons in your toolbar. A lightbulb button for "Ask ChatGPT" and a coding angular brackets button for "Ask AnalystGPT".

### Usage

Using the jupyterGPT extension is straight forward.
- In a markdown cell, type in the question/task that you have and then click on the "Ask ChatGPT" button if you want text answers or click on the "Ask AnalystGPT" button if you want to generate some code or perform analysis that requires code.