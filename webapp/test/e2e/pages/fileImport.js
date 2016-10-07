var fileImport = function() {

    //datagrid
    this.myDataLink = function () { return element(by.css('.container > ul > li:nth-child(2) > a'));};
    this.importButton = function () { return element(by.css('[ng-click="openUploadModal()"]'));};
    this.advancedSearch = function () { return element(by.css('.advancedSearch-container > button'));};
    this.recordCount = function () { return element(by.css('.dataTables_info > strong:nth-child(3)'));};
    this.listData = function () { return element(by.css('[data-table-name="listData"]'));};
    this.tableHeader = function () { return element.all(by.css('table > thead > tr > th'));};
    this.tableData = function () { return element.all(by.css('table > tbody > tr > td'));};
    this.firstRowData = function () { return element(by.css('table > tbody > tr:nth-child(1) > td:nth-child(1)'));};
    this.firstRowStatusData = function () { return element(by.css('table > tbody > tr:nth-child(1) > td:nth-child(6) > i'))};
    this.statusTooltip = function () { return element(by.css('.tooltip > .tooltip-inner'));};
    this.dropdownBtn = function () { return element(by.css('table > tbody > tr:nth-child(1) > td:nth-child(7) > div > button'))};
    this.searchButton = function () { return element(by.css('.input-append > .search-query'));};

    //File Import
    this.uploadModal = function () { return element(by.id('upload'));};
    this.modalHeader = function() { return element(by.css('.modal-header > h3'));};
    this.dataname = function () { return element(by.model('dataset.name'));};
    this.description = function () { return element(by.model('dataset.description'));};
    this.tablename = function () { return element(by.model('dataset.tablename'));};
    this.browse = function () { return element(by.css('[ng-click="initiateBrowse()"]'));};
    this.cancel = function () { return element(by.css('[ng-click="clearField()"]'));};
    this.importFile = function () { return element(by.css('[ng-click="importFiles()"]'));};
    this.missingDataName = function () { return element(by.css('[ng-if="missingName"]'));};
    this.missingTableName = function () { return element(by.css('[ng-if="missingTableName"]'));};
    this.missingFile = function () { return element(by.css('[ng-if="missingFile"]'));};
    this.fileTypeError = function () { return element(by.css('[ng-if="errorFileType"]'));};
    this.uploadInput = function () { return element(by.id('uploadInput'));};
    this.getRandomNumber = function (numberLength) {
        var randomNumber = "";
        var possible = "0123456789";
        for (var i = 0; i < numberLength; i++)
            randomNumber += possible.charAt(Math.floor(Math.random() * possible.length));
        return randomNumber;
    };

    this.close = function () {return element(by.css('[ng-click="cancel()"]'));};
    this.datasource = function () { return element(by.model('datasource'));};
    this.datasourceImport = function () { return element(by.css('.modal-footer > div > button'));};
    this.datasourceOption1 = function () { return element(by.cssContainingText('option', 'File'));};
    this.datasourceOption2 = function () { return element(by.cssContainingText('option', 'Oracle'));};
    this.datasourceOption3 = function () { return element(by.cssContainingText('option', 'Teradata'));};
    this.strValue = function () { return element(by.css('.modal-body > span'));};

    //Connection String Modal
    this.connectionStr = function () { return element(by.css('table > tbody > tr:nth-child(1) > td:nth-child(7) > div > ul > li:nth-child(1)'));};
    this.connectionText = function () { return element(by.css('table > tbody > tr:nth-child(1) > td:nth-child(7) > div > ul > li:nth-child(1) > a'));};

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
module.exports = new fileImport();