sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("lists.controller.App", {
            onInit: function () {
                let oJSONModel = new sap.ui.model.json.JSONModel();
                oJSONModel.loadData("../localService/mockdata/ListData.json");
                this.getView().setModel(oJSONModel);
            }
        });
    });
