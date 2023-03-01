//@ts-nocheck
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
            },

            getGroupHeader: function (oGroup) {
                let groupHeaderListItem = new sap.m.GroupHeaderListItem({
                    title: oGroup.key,
                    upperCase: true
                });

                return groupHeaderListItem;
            },

            onShowSelectedItems: function () {
                let standardList = this.getView().byId("standardList");
                let selectedItems = standardList.getSelectedItems();
                let i18nModel = this.getView().getModel("i18n").getResourceBundle();

                if (selectedItems.length === 0) {
                   sap.m.MessageToast.show(i18nModel.getText("noSelection")); 
                } else {
                    let textMessage = i18nModel.getText("selection");

                    for (let item in selectedItems) {
                        let context = selectedItems[item].getBindingContext();
                        let oContext = context.getObject();
                        textMessage = textMessage + " - " + oContext.Material;
                    }

                    sap.m.MessageToast.show(textMessage);
                }
            },

            onDeleteSelectedItems: function () {
                let standardList = this.getView().byId("standardList");
                let selectedItems = standardList.getSelectedItems();
                let i18nModel = this.getView().getModel("i18n").getResourceBundle();

                if (selectedItems.length === 0) {
                   sap.m.MessageToast.show(i18nModel.getText("noSelection")); 
                } else {
                    let textMessage = i18nModel.getText("delete");
                    let model = this.getView().getModel();
                    let products = model.getProperty("/Products");

                    let arrayId = [];

                    for (let i in selectedItems) {
                        let context = selectedItems[i].getBindingContext();
                        let oContext = context.getObject();

                        arrayId.push(oContext.Id);
                        textMessage = textMessage + " - " + oContext.Material;
                    }

                    products = products.filter(function (p) {
                        return !arrayId.includes(p.Id);
                    });

                    model.setProperty("/Products", products);
                    standardList.removeSelections();
                    sap.m.MessageToast.show(textMessage);
                }
            },

            onDeleteRow: function (oEvent) {
                let selectedRow = oEvent.getParameter("listItem");
                let context = selectedRow.getBindingContext();
                let splitPath = context.getPath().split("/");
                let indexSeletedRow = splitPath[splitPath.length-1];
                let model = this.getView().getModel();
                let products = model.getProperty("/Products");
                products.splice(indexSeletedRow, 1);
                model.refresh();
            }
        });
    });
