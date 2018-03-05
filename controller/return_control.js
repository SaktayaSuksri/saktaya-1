module.exports = {
    responseWithCode: function (codeNum, txt, response) {
        console.log("** Response         >> " + txt);
        response.json({ code: codeNum, message: txt });
    },
    responseWithCodeAndData: function (codeNum, txt, data, response) {
        console.log("** Response message >> " + txt);
        console.log("** Response data    >> " + JSON.stringify(data));
        response.json({ code: codeNum, message: txt, data: data });
    }
};