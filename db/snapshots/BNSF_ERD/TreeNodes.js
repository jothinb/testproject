// You can find instructions for this file here:
// http://www.treeview.net

// Decide if the names are links or just the icons
USETEXTLINKS = 1  //replace 0 with 1 for hyperlinks

// Decide if the tree is to start all open or just showing the root folders
STARTALLOPEN = 0 //replace 0 with 1 to show the whole tree

ICONPATH = 'Support/' //change if the gif's folder is a subfolder, for example: 'images/'


USEICONS = 1

{
foldersTree = gFld("Title", "title.htm")
foldersTree.iconSrc = ICONPATH + "Gif/globe.gif"
Diag_Node = insFld(foldersTree, gFld("DATA MODEL", "diagram.htm"))
Diag_Node.iconSrc = ICONPATH + "Gif/ERSTUDIO.gif"
Diag_Node.iconSrcClosed = ICONPATH + "Gif/ERSTUDIO.gif"
Model_Node = insFld(Diag_Node, gFld("Physical", "Content/Model_47735015f0a04eae8034979e05bcd770.htm"))
Model_Node.iconSrc = ICONPATH + "Gif/physical.gif"
Model_Node.iconSrcClosed = ICONPATH + "Gif/physical.gif"
{
Submodel_5bf186370e8940289a2014a98588de00 = insFld(Model_Node, gFld("Main Model", "Content/Submodel_5bf186370e8940289a2014a98588de00.htm"))
Submodel_5bf186370e8940289a2014a98588de00.iconSrc = ICONPATH + "Gif/grnfldr.gif"
Submodel_5bf186370e8940289a2014a98588de00.iconSrcClosed = ICONPATH + "Gif/grnfldr.gif"
SubmodelImgNode = insDoc(Submodel_5bf186370e8940289a2014a98588de00, gLnk("R", "Model Image", "Content/Submodel_5bf186370e8940289a2014a98588de00_img.htm"))
SubmodelImgNode.iconSrc = ICONPATH + "Gif/image.gif"
SubmodelImgNode.altTxt = "Model Image"
EntityFolder = insFld(Submodel_5bf186370e8940289a2014a98588de00, gFld("Tables", "Content/Sub_5bf186370e8940289a2014a98588de00_EntFrame.htm"))
EntityFolder.iconSrc = ICONPATH + "Gif/entfldr.gif"
EntityFolder.iconSrcClosed = ICONPATH + "Gif/entfldr.gif"
AttrFolder = insFld(Submodel_5bf186370e8940289a2014a98588de00, gFld("Columns", "Content/Sub_5bf186370e8940289a2014a98588de00_AttrFrame.htm"))
AttrFolder.iconSrc = ICONPATH + "Gif/attr.gif"
AttrFolder.iconSrcClosed = ICONPATH + "Gif/attr.gif"
IndexFolder = insFld(Submodel_5bf186370e8940289a2014a98588de00, gFld("Indexes", "Content/Sub_5bf186370e8940289a2014a98588de00_IdxFrame.htm"))
IndexFolder.iconSrc = ICONPATH + "Gif/index.gif"
IndexFolder.iconSrcClosed = ICONPATH + "Gif/index.gif"
ViewFolder = insFld(Submodel_5bf186370e8940289a2014a98588de00, gFld("Views", "Content/Sub_5bf186370e8940289a2014a98588de00_ViewFrame.htm"))
ViewFolder.iconSrc = ICONPATH + "Gif/viewfldr.gif"
ViewFolder.iconSrcClosed = ICONPATH + "Gif/viewfldr.gif"
RelFolder = insFld(Submodel_5bf186370e8940289a2014a98588de00, gFld("Foreign Keys", "Content/Sub_5bf186370e8940289a2014a98588de00_RelFrame.htm"))
RelFolder.iconSrc = ICONPATH + "Gif/relfldr.gif"
RelFolder.iconSrcClosed = ICONPATH + "Gif/relfldr.gif"
FuncFolder = insFld(Submodel_5bf186370e8940289a2014a98588de00, gFld("Functions", "Content/Sub_5bf186370e8940289a2014a98588de00_FuncFrame.htm"))
FuncFolder.iconSrc = ICONPATH + "Gif/func.gif"
FuncFolder.iconSrcClosed = ICONPATH + "Gif/func.gif"
ObjectTypeFolder = insFld(Submodel_5bf186370e8940289a2014a98588de00, gFld("Object Types", "Content/Sub_5bf186370e8940289a2014a98588de00_ObjTypeFrame.htm"))
ObjectTypeFolder.iconSrc = ICONPATH + "Gif/objecttype.gif"
ObjectTypeFolder.iconSrcClosed = ICONPATH + "Gif/objecttype.gif"
PackFolder = insFld(Submodel_5bf186370e8940289a2014a98588de00, gFld("Packages", "Content/Sub_5bf186370e8940289a2014a98588de00_PkgFrame.htm"))
PackFolder.iconSrc = ICONPATH + "Gif/package.gif"
PackFolder.iconSrcClosed = ICONPATH + "Gif/package.gif"
ProcFolder = insFld(Submodel_5bf186370e8940289a2014a98588de00, gFld("Procedures", "Content/Sub_5bf186370e8940289a2014a98588de00_ProcFrame.htm"))
ProcFolder.iconSrc = ICONPATH + "Gif/proc.gif"
ProcFolder.iconSrcClosed = ICONPATH + "Gif/proc.gif"
SequenceFolder = insFld(Submodel_5bf186370e8940289a2014a98588de00, gFld("Sequences", "Content/Sub_5bf186370e8940289a2014a98588de00_SeqFrame.htm"))
SequenceFolder.iconSrc = ICONPATH + "Gif/seq.gif"
SequenceFolder.iconSrcClosed = ICONPATH + "Gif/seq.gif"
SynonymFolder = insFld(Submodel_5bf186370e8940289a2014a98588de00, gFld("Synonyms", "Content/Sub_5bf186370e8940289a2014a98588de00_SynFrame.htm"))
SynonymFolder.iconSrc = ICONPATH + "Gif/synonym.gif"
SynonymFolder.iconSrcClosed = ICONPATH + "Gif/synonym.gif"
TriggerFolder = insFld(Submodel_5bf186370e8940289a2014a98588de00, gFld("Triggers", "Content/Sub_5bf186370e8940289a2014a98588de00_TrigFrame.htm"))
TriggerFolder.iconSrc = ICONPATH + "Gif/trigger.gif"
TriggerFolder.iconSrcClosed = ICONPATH + "Gif/trigger.gif"
}
}
