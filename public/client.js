/*function runIt(){
	var x;
	if(window.XMLHttpRequest){
		//code for modern browsers
		x = new XMLHttpRequest();
	}else{
		x = new ActiveObject("Microsoft.XMLHTTP");
	}
	x.onreadystatechange = function(){
		if(x.readyState == 4 && x.status == 200){
			document.getElementById("demo").innerHTML = x.responseText;
		}
	};
	
	x.open("GET", "ajax_info.txt", true);
	x.send();

}*/


$(function(){
	var asset;
	var name;



	console.log("Running");
	
	$('#run').click(function(){
		$('#target').submit();
		
	});
	
	$('#target').submit(function(event){
		asset = $('#asset').val();
		name = $('#name').val();
		//alert("The input is " + asset + " " + name);
		event.preventDefault();
		
		$.get('/log', {a: asset, n: name}, function(data){
			console.log("Sent request data");
		});
		
	});
	
	
});
	
			
			