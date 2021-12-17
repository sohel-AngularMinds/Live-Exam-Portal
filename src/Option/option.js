import React from 'react'

const option = () => {
    return (
        <div className="col-12 mb-3">
            <div class="input-group ">
                <span class="input-group-text align-baseline gap-2">
                    <span className="">
                        <input className="form-check-input" type="checkbox" />
                    </span>
                    <span className="mt-2">
                        <h6>Option 1</h6>
                    </span>
                </span>
                <textarea class="form-control" aria-label="With textarea"></textarea>
            </div>

            <div id="textareaHelp2">
                <span class="form-text">Remove Option</span>
                <span class="form-text"> | </span>
                <span class="form-text">Enable Rich Text Editor</span>
            </div>
        </div>
    )
}

export default option
