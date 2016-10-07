var databaseImport = function() {

    //datagrid
    this.myDataLink = function () { return element(by.css('.container > ul > li:nth-child(2) > a'));};
    this.importButton = function () { return element(by.css('[ng-click="openUploadModal()"]'));};

    //Database Import
    this.uploadModal = function () { return element(by.id('upload'));};
    this.modalHeader = function() { return element(by.css('.modal-header > h3'));};
    this.recordCount = function () { return element(by.css('.dataTables_info > strong:nth-child(3)'));};
    this.datasource = function () { return element(by.model('datasource'));};
    this.datasourceOption2 = function () { return element(by.cssContainingText('option', 'Oracle'));};
    this.datasourceOption3 = function () { return element(by.cssContainingText('option', 'Teradata'));};
    this.connectionURL = function () { return element(by.model('connection.url'));};
    this.connectionUsername = function () { return element(by.model('connection.username'));};
    this.connectionPassword = function () { return element(by.model('connection.password'));};
    this.cancel = function () { return element(by.css('[ng-click="clearField()"]'));};
    this.dbConnect = function () { return element(by.css('[ng-click="connectToDB()"]'));};
    this.missingURL = function () { return element(by.css('[ng-if="connectionErrors.url"]'));};
    this.missingUsername = function () { return element(by.css('[ng-if="connectionErrors.name"]'));};
    this.missingPassword = function () { return element(by.css('[ng-if="connectionErrors.password"]'));};
    this.connectionDataName = function () { return element(by.model('connection.dataName'));};
    this.connectionDescription = function () { return element(by.model('connection.description'));};
    this.uploadDB = function () { return element(by.css('[ng-click="uploadDB()'));};
    this.missingDBName = function () { return element(by.css('[ng-if="DBErrors.name"]'));};
    this.tableviewList = function () { return element(by.repeater('table in schemas.tables').row(0)).element(by.css('input[type="checkbox"]'));};
    this.listData = function () { return element(by.css('[data-table-name="listData"]'));};
    this.tableHeader = function () { return element.all(by.css('table > thead > tr > th'));};
    this.tableData = function () { return element.all(by.css('table > tbody > tr > td'));};
    this.firstRowStatusData = function () { return element(by.css('table > tbody > tr:nth-child(1) > td:nth-child(6) > i'))};
    this.statusTooltip = function () { return element(by.css('.tooltip > .tooltip-inner'));};
    this.dropdownBtn = function () { return element(by.css('table > tbody > tr:nth-child(1) > td:nth-child(7) > div > button'))};
    this.searchButton = function () { return element(by.css('.input-append > .search-query'));};
    this.firstRowData = function () { return element(by.css('table > tbody > tr:nth-child(1) > td:nth-child(1)'));};

    //Connection String
    this.connectionStr = function () { return element(by.css('table > tbody > tr:nth-child(1) > td:nth-child(7) > div > ul > li:nth-child(1)'));};
    this.connectionText = function () { return element(by.css('table > tbody > tr:nth-child(1) > td:nth-child(7) > div > ul > li:nth-child(1) > a'));};
    this.strValue = function () { return element(by.css('.modal-body > span'));};
    this.close = function () {return element(by.css('[ng-click="cancel()"]'));};


    //Rename Modal
    this.renameStr = function () { return element(by.css('table > tbody > tr:nth-child(1) > td:nth-child(7) > div > ul > li:nth-child(2)'));};
    this.renameText = function () { return element(by.css('table > tbody > tr:nth-child(1) > td:nth-child(7) > div > ul > li:nth-child(2) > a'));};
    this.updateName = function () {return element(by.css('[ng-click="updateName()"]'));};
    this.updatedDataName = function () { return element(by.model('dataset.updatedName'));};
    this.missingNewName = function() { return element(by.css('[ng-if="error.missingName"]'));};


    //Delete Modal
    this.deleteStr = function () { return element(by.css('table > tbody > tr:nth-child(1) > td:nth-child(7) > div > ul > li:nth-child(3)'));};
    this.deleteText = function () { return element(by.css('table > tbody > tr:nth-child(1) > td:nth-child(7) > div > ul > li:nth-child(3) > a'));};
    this.deleteData = function () {return element(by.css('[ng-click="confirmDelete()"]'));};


};
module.exports = new databaseImport();