//@ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "employeesv2/model/formatter"
    
], function(Controller, formatter){
    "use strict";

    function onInit () {
        this._bus = sap.ui.getCore().getEventBus();
    };

    function onCreateIncidence () {
        let tableIncidence = this.getView().byId("tableIncidence");
        let newIncidence = sap.ui.xmlfragment("employeesv2.fragment.NewIncidence", this);
        let incidenceModel = this.getView().getModel("incidenceModel");
        let odata = incidenceModel.getData();
        let index = odata.length;
        odata.push({index : index + 1});
        incidenceModel.refresh();
        newIncidence.bindElement("incidenceModel>/" + index);
        tableIncidence.addContent(newIncidence);
    };

    function onDeleteIncidence (oEvent) {
        //let tableIncidence = this.getView().byId("tableIncidence");
        //let rowIncidence = oEvent.getSource().getParent().getParent();
        //let incidenceModel = this.getView().getModel("incidenceModel");
        //let odata = incidenceModel.getData();
        //let contextObj = rowIncidence.getBindingContext("incidenceModel");

        //odata.splice(contextObj.index-1, 1);
        //for (let i in odata) {
        //    odata[i].index = parseInt(i) + 1;
        //};

        //incidenceModel.refresh();
        //tableIncidence.removeContent(rowIncidence);

        //for (let j in tableIncidence.getContent()) {
        //    tableIncidence.getContent()[j].bindElement("incidenceModel>/" + j);
        //};

        let oContext = oEvent.getSource().getBindingContext("incidenceModel").getObject();
        this._bus.publish("incidence", "onDeleteIncidence", {
            IncidenceId: oContext.IncidenceId,
            SapId: oContext.SapId,
            EmployeeId: oContext.EmployeeId
        });
    };

    function onSaveIncidence (oEvent) {
        let incidence = oEvent.getSource().getParent().getParent();
        let rowIncidence = incidence.getBindingContext("incidenceModel");         
        this._bus.publish("incidence", "onSaveIncidence", {incidenceRow : rowIncidence.sPath.replace('/','')});
    };

    function updateIncidenceCreationDate (oEvent) {
        let context = oEvent.getSource().getBindingContext("incidenceModel");
        let oContext = context.getObject();
        oContext.CreationDateX = true;
    };

    function updateIncidenceReason (oEvent) {
        let context = oEvent.getSource().getBindingContext("incidenceModel");
        let oContext = context.getObject();
        oContext.ReasonX = true;
    };

    function updateIncidenceType (oEvent) {
        let context = oEvent.getSource().getBindingContext("incidenceModel");
        let oContext = context.getObject();
        oContext.TypeX = true;
    };

    let EmployeeDetails = Controller.extend("employeesv2.controller.EmployeeDetails", {});

    EmployeeDetails.prototype.onInit = onInit;
    EmployeeDetails.prototype.onCreateIncidence = onCreateIncidence;
    EmployeeDetails.prototype.Formatter = formatter;
    EmployeeDetails.prototype.onDeleteIncidence = onDeleteIncidence;
    EmployeeDetails.prototype.onSaveIncidence = onSaveIncidence;
    EmployeeDetails.prototype.updateIncidenceCreationDate = updateIncidenceCreationDate;
    EmployeeDetails.prototype.updateIncidenceReason = updateIncidenceReason;
    EmployeeDetails.prototype.updateIncidenceType = updateIncidenceType;

    return EmployeeDetails;
});