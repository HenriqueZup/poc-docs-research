<!-- 
******************************************

- THIS IS AN EXAMPLE OF HOW TO FILL OUT YOUR DOCUMENTATION OF CONTENT.

- FILL OUT THE TEMPLATE BELOW WITH YOUR INFORMATION SO OTHER PEOPLE CAN USE IT. THIS DOCUMENTATION WILL APPEAR ON THE SECTION OF THE STACKSPOT PORTAL.

******************************************
-->
## tw-test-urls

This Action is an automated tool to check for broken links on a website. It recursively crawls all pages of a site, extracts internal links, and verifies if they are accessible. The Action also allows setting a maximum recursion depth to limit the number of pages checked.

### Main Features:

1. **Link Verification:** The script accesses each page of the site, extracts the links, and checks if they are accessible (HTTP status code 200).

2. **Controlled Recursion:** It follows internal links recursively, respecting a configurable depth limit.

3. **Result Storage:** Broken links are stored in three different formats:
   - Text file (`broken_links.txt`)
   - JSON file (`broken_links.json`)
   - Markdown file (`broken_links.md`)

4. **Cross-Platform Compatibility:** The output files are saved in the user's "Documents" folder, compatible with Windows, MacOS, and Linux.

5. **Avoids Repetition:** The script maintains a set of already visited links to avoid duplicate checks.

## Requirements

<!-- 
[This is a guideline, delete this content and write your information outside this marking <!-- ]

- Describe the requirements the user needs to know before using the Action.
-->
- Install Python:
  - [**MacOS**](https://python.org.br/instalacao-mac/);
  - [**Linux**](https://python.org.br/instalacao-linux/);
  - [**Windows**](https://python.org.br/instalacao-windows/).
- Install the dependencies:

```bash
pip install requests beautifulsoup4
```

or

```bash
pip3 install requests beatifulsoup4
```

## Usage

### How it works

- The script starts by checking the main page of the provided website.  
- It extracts all the links from that page and checks if they are accessible.  
- For each internal link found, the script follows the link and repeats the process of extracting and verifying links until the configured maximum depth is reached.  
- Broken links are stored in text, JSON, and Markdown files in the user's "Documents" folder.  

#### Parameters

**`inputs.server`**: URL of the website to be checked.  
**`inputs.max_depth`**: Maximum recursion depth for link verification.  

#### Output

Files containing the broken links found, saved in the user's "Documents" folder:

- `broken_links.txt`
- `broken_links.json`
- `broken_links.md`

### Step 1. Run the Action locally:

Inside the Action folder, run the following command.

```bash
stk run action .
```

### Step 2. Fill in the inputs:

- **Select the server type:** The server types are the URLs of the website where the Action will search for links.

- **Search depth:**

    - If the website you are checking is small, you can set a higher value for the search depth (e.g., 10).
    - If the website is very large, you can set a lower value (e.g., 3) to avoid the script taking too long to execute.


## Release Notes

<!-- 
[This is a guideline; delete this content and write your information outside this markup. <!-- ]

This section is only necessary if you publish a new Action version. Add what was changed, fixed, and the new features. 

Example:
###  action-doc-template v1.0.0

#### Features
Added new templates
-->