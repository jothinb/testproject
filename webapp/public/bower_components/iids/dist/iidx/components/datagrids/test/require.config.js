requirejs.config({
  baseUrl: "/",
  paths: {
    datagrids: "js/datagrids",
    brandkit: "components/brandkit/js/brandkit",
    'datatables-colreorder': "components/datatables-col-reorder/index",
    "datatables-scroller": "components/datatables-scroller/index",
    datatables: "components/datatables/dist/media/js/jquery.dataTables",
    "ge-bootstrap": "components/ge-bootstrap/js/ge-bootstrap",
    jquery: "components/jquery/jquery",
    respond: "components/respond/respond.src",
    "responsive-emitter": "components/responsive-emitter/js/responsive-emitter",
    "jqueryui-sortable-amd": "components/jqueryui-sortable-amd/js/jquery-ui-1.10.2.custom",
    modules: "components/modules/js/modules",
    "bootstrap": "components/bootstrap/js"
  },
  shim : {
      'datagrids/datagrids-col-vis': {
          deps: ['jquery', 'datatables']
      },
      'datatables-colreorder': {
          deps: ['jquery', 'datatables']
      }
  }
});
