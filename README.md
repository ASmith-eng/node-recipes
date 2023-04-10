# node-recipes
First personal Node.js app utilising Express.js to serve basic food recipe website.

This is a work in progress and is intended for training purposes currently, with particular focus on back-end design (placeholder content).

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
                "quantity": "[INGREDIENT_QUANTITY1]",
                "unit": "[UNIT]"
            },
            {
                "name": "[INGREDIENT_NAME2]",
                "quantity": "[INGREDIENT_QUANTITY2]",
                "unit": "[UNIT]"

            },
            ...
            {
                "name": "[INGREDIENT_NAME20]",
                "quantity": "[INGREDIENT_QUANTITY20]",
                "unit": "[UNIT]"

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