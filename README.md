# node-recipes
Personal Node.js app utilising Express.js to serve basic food recipe website.

A work in progress and is intended for training and development. Placeholder content included to help develop both front and backend. Technologies:
- Node.js
- Express.js
- Pug
- CSS
- MongoDB

## MongoDB Document Format:
    
    {
        "recipeID": "[RECIPE_ID]",
        "name": "[NAME]",
        "description": "[DESCRIPTION]",
        "imgID": "[IMG_ID]",
        "imgName": "[IMG_NAME]",
        "img_AltDescription": "[IMG_DESCRIPTION]"
    }

    {
        "recipeID": "[RECIPE_ID]",
        "ingredients": [
            {
                "name": "[INGREDIENT_NAME1]",
                "quantity": "[INGREDIENT_QUANTITY1]"
            },
            {
                "name": "[INGREDIENT_NAME2]",
                "quantity": "[INGREDIENT_QUANTITY2]"
            },
            ...
            {
                "name": "[INGREDIENT_NAME20]",
                "quantity": "[INGREDIENT_QUANTITY20]"
            }
        ],
        "steps": [
            {
                "step1Name": "[STEP_NAME_1]",
                "step1Description": "[STEP_DESCRIPTION_1]"
            },
            {
                "step1Name": "[STEP_NAME_2]",
                "step1Description": "[STEP_DESCRIPTION_2]"
            },
            ...
            {
                "step1Name": "[STEP_NAME_12]",
                "step1Description": "[STEP_DESCRIPTION_12]"
            }
        ]
    }