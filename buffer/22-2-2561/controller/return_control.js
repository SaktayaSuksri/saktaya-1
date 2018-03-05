module.exports = {
    responseWithCode: function (codeNum, txt, response) {
        console.log("** Response         >> " + txt);
        response.json({ code: codeNum, message: txt });
    }
};