function validationInput(classWrong) {
    var res = true;
    document.querySelectorAll("input[type='text'], textarea, input[type='password']").forEach(function(item) {
        if (item.pattern != null && item.pattern != "" && item.value.match(new RegExp("^" + item.pattern + "$")) == null ||
            item.required && item.value == "") {
            item.classList.add(classWrong)
            res = false;
        } else
            item.classList.remove(classWrong);
    });
    return res;
}

export default validationInput;

export function validationInputForBorder(classWrong) {
    var res = true;
    document.querySelectorAll("input[type='text'], textarea, input[type='password']").forEach(function(item) {
        if (item.pattern != null && item.pattern != "" && item.value.match(new RegExp("^" + item.pattern + "$")) == null ||
            item.required && item.value == "") {
            item.parentElement.classList.add(classWrong)
            res = false;
            console.log("2");
        } else {
            item.parentElement.classList.remove(classWrong);
            console.log("1");
        }
    });
    return res;
}