$(function(){
	var asset;
	var name;
	
	var list = [];
	
	var box = '<input type="text" class= "ltoName" value="">';
	var but = '<button type ="button" class="addLTO">LTO</button>';
	
	
	$.get('/laptops', {}, function(data){
		//console.log("Get request sent");
		console.log("Response.. ");
		for(var i = 0; i < data.length; i++){
			list.push({
				id: data[i].id,
				asset: data[i].asset,
				name: data[i].name,
				lto: data[i].lto
			});
				
			var info = list[i].asset + " " + list[i].name + " " + list[i].lto;
			
			var line = "<li id='" + list[i].id + "'>" + info + box + but +  "</li>";
			
			console.log(line);

			$('#display').append(line);
		}	
	});
	
	


	
	//enter lto 
	$(document).on('click', '.addLTO', function(){
		console.log($(this).prev().val());
		
		
		
	});
	
	$('#run').click(function(){
		$('#target').submit();
	});
	
	
	$('#target').submit(function(event){
		asset = $('#asset').val();
		name = $('#name').val();
		
		$('#asset').val('');
		$('#name').val('');
		
		//alert("The input is " + asset + " " + name);
		event.preventDefault();
		
		$.post('/laptops', {a: asset, n: name}, function(data){
			console.log("Post request sent");
		});
		
		location.reload(true);
		
	});
	
	
});
	
			
			