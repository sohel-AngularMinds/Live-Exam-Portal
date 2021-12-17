import React from 'react'

const PerQuestion = () => {
    return (
        <div className="container">
            <form>
                <label>Question Text</label>

                <input type="radio" id="html" name="fav_language" value="HTML" />
                <label for="html">HTML</label><br />
                <input type="radio" id="css" name="fav_language" value="CSS" />
                <label for="css">CSS</label><br />
                <input type="radio" id="javascript" name="fav_language" value="JavaScript" />
                <label for="javascript">JavaScript</label>
            </form>
        </div>
    )
}

export default PerQuestion
