export function finalValidation(obj, setOptionError) {
    let newError = {}

    if (obj.subject == null || obj.subject === 'ttss')
        newError = { ...newError, subject: 'please Select the subject it is necessary' }


    if (obj.topic == null || obj.topic === 'ttst')
        newError = { ...newError, topic: 'please Select the topic it is necessary' }

    if (obj.questionText === "" || obj.questionText == null)
        newError = { ...newError, questionText: "don't let it empty it is mandatory" }

    if (obj.type === "" || obj.type == null)
        newError = { ...newError, type: "type is required" }

    if (obj.diffLevel === "" || obj.diffLevel == null)
        newError = { ...newError, diffLevel: "difficulty Level is required" }


    if (obj.rightMarks === '' || obj.rightMarks === 0 || obj.rightMarks < 1)
        newError = { ...newError, rightMark: "please provide proper Mark" }

    if (obj.wrongMarks === '' || obj.wrongMarks < 0)
        newError = { ...newError, wrongMark: "please provide proper Mark" }


    if (obj.rightMarks < obj.wrongMarks)
        newError = { ...newError, rightMark: "right mark always greater than wrong mark" }


    if (obj.options.length >= 2) {
        let optionErrorArray = [];
        let trueValue = 0;

        function checkOptionText(value, index) {
            if (value.option === '' || value.option == null)
                optionErrorArray[index] = "option is required"
            else
                optionErrorArray[index] = ""

            // eslint-disable-next-line eqeqeq
            if (value.isCorrect == true)
                ++trueValue;
        }
        obj.options.forEach(checkOptionText)

        newError = { ...newError, optionErrorArray: optionErrorArray }
        setOptionError(optionErrorArray);

        let found = false;

        for (let i = 0; i < obj.options.length - 1; i++) {
            for (let j = i + 1; j < obj.options.length; j++) {
                if (obj.options[i].option !== '' || obj.options[j].option !== '') {

                    if (obj.options[i].option === obj.options[j].option) {
                        found = true;
                    }
                }

            }
        }
        if (found) {
            newError = { ...newError, sameElement: 'Duplicate options are not allowed.' };
        }
        else {
            delete newError.sameElement;
        }


        if (trueValue === 0) {
            newError = { ...newError, zeroOption: "Please select at least 1 option" }
        }
    }
    else {
        newError = { ...newError, zeroOption: "Please add at least 2 options " }
    }

    return newError;
}
