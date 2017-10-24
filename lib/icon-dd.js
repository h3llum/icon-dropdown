// Image dropdown Jquery plugin
// 2017 Gerard Nieborg

var iconDDInstance = 0;

$.fn.icondd = function() {
    
	this.hide();
    
    var imgDD = $('<div class="icondd"></div>');
   
    imgDD.append('<input type="checkbox" id="icondd_' + iconDDInstance + '" />');
       
    
    var selText = $('option:selected',this).text(); 
    var selLabel = $('<label for="icondd_' + iconDDInstance + '" class="icondd__title">' + selText + '</label>');
    
    var selIcon = $('option:selected',this).data("icon");    
    if (typeof selIcon !== "undefined") {        
    	selLabel.prepend('<div class="icondd__title-icon">' + selIcon +'</div>');    	
    }
    
    imgDD.append(selLabel);
    
    var itemList = $('<ul class="icondd__item-list"></ul>');
    
    $("option", this).each(function() {
    	var $listItem = $('<li data-icon="' + $(this).data("icon") + '" data-val="' + $(this).val() + '" class="icondd__item-list-item">' + $(this).text() + '</li>');
    	var selIcon = $(this).data("icon");
    	if (typeof selIcon !== "undefined") {    
    		$listItem.prepend('<div class="icondd__list-icon">' + selIcon +'</div>');    	
        }
    	itemList.append($listItem);
    });
    
    imgDD.append(itemList);
    
    this.before(imgDD);
    
    iconDDInstance++;
    
};


$("body").on("mouseup", function(e) {
	
	var container = $(".icondd");
	
    if (!container.is(e.target) && container.has(e.target).length === 0)  {
    	$(".icondd input[type=checkbox]").prop('checked', false);
	}    
    
});

$("body").on("click", ".icondd__item-list-item", function(e) {
	
	var $select = $(this).parent().parent().next("select");
	
	$select.val($(this).data("val")).change();
	
	var selLabel = $(this).parent().parent().find(".icondd__title");
	selLabel.html($(this).text());

	var selIcon = $(this).data("icon");
	if (typeof selIcon !== "undefined") {    
    	selLabel.prepend('<div class="icondd__title-icon">' + selIcon +'</div>');    	
    }
	
	
	$(this).parent().parent().find("input[type=checkbox]").prop('checked', false);
	
});