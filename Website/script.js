function addtolist(stock,con,val){
    var table=document.getElementById("view_data");
    var row=table.insertRow(-1);
    var stockcell=row.insertCell(0);
    var condcell=row.insertCell(1);
    var valcell=row.insertCell(2);
    var editcell=row.insertCell(3);
    var delcell = row.insertCell(4);
    stockcell.innerHTML = stock;
    condcell.innerHTML = con;
    valcell.innerHTML = val;
    delcell.innerHTML = "<button type='button' onclick='delrowbutton(this)'>delete</button>";
    editcell.innerHTML = "<button class='edit_button' type='button' onclick='editrow(this)'>edit</button>";
}

function inputt(){
    var stock=document.getElementById("stock").value;
    var cond=document.getElementById("cond").value;
    var val=document.getElementById("value").value;
    addtolist(stock,cond,val);
}

function editrow(element){
    disable_all_edit_button(true);
    var ele_index=element.parentNode.parentNode.rowIndex;
    var tablee=document.getElementById("view_data");
    var cells=tablee.rows[ele_index].cells;
    deleterow(ele_index)
    var row=tablee.insertRow(ele_index);
    var stockcell=row.insertCell(0);
    var condcell=row.insertCell(1);
    var valcell=row.insertCell(2);
    var savecell=row.insertCell(3);
    var delcell = row.insertCell(4);
    stockcell.innerHTML = '<input id="view_stock" type="text" name="stock">';
    condcell.innerHTML = '<select id="view_cond" name="cond"><option value="greater than">greater than</option><option value="less than">less than</option><option value="greater than eql">greater than eql</option><option value="les than eql">les than eql</option></select>';
    valcell.innerHTML = '<input id="view_value" type="number" name="value">';
    delcell.innerHTML = "<button type='button' onclick='delrowbutton(this)'>delete</button>";
    savecell.innerHTML = "<button type='button' onclick='saverow(this)'>save</button>";
    document.getElementById("view_stock").value=cells[0].innerHTML;
    if(cells[1].innerHTML=="greater than"){
        document.getElementById("view_cond").selectedIndex=0;
    }else if(cells[1].innerHTML=="less than"){
        document.getElementById("view_cond").selectedIndex=1;
    }else if(cells[1].innerHTML=="greater than eql"){
        document.getElementById("view_cond").selectedIndex=2;
    }else if(cells[1].innerHTML=="les than eql"){
        document.getElementById("view_cond").selectedIndex=3;
    }
    document.getElementById("view_value").value=cells[2].innerHTML;

}

function saverow(element){
    disable_all_edit_button(false);
    var ele_index=element.parentNode.parentNode.rowIndex;
    var tablee=document.getElementById("view_data");
    var row=tablee.insertRow(ele_index);
    var stockcell=row.insertCell(0);
    var condcell=row.insertCell(1);
    var valcell=row.insertCell(2);
    var savecell=row.insertCell(3);
    var delcell = row.insertCell(4);
    savecell.innerHTML="<button type='button' onclick='saverow(this)'>save</button>";
    delcell.innerHTML="<button type='button' onclick='delrowbutton(this)'>delete</button>";
    condcell.innerHTML=document.getElementById("view_cond").value;
    stockcell.innerHTML=document.getElementById("view_stock").value;
    valcell.innerHTML=document.getElementById("view_value").value;
    deleterow(ele_index+1)
}

function delrowbutton(element){
    disable_all_edit_button(false);
    deleterow(element.parentNode.parentNode.rowIndex);
}

function deleterow(indexx){
    var table=document.getElementById("view_data");
    table.deleteRow(indexx);
}

function disable_all_edit_button(bool){
    var edit_buttons=document.getElementsByClassName("edit_button");
    console.log(edit_buttons.length);
    for (let i=0;i<edit_buttons.length;i++){
        edit_buttons[i].disabled=bool;
    }
}