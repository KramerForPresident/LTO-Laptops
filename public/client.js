$(function(){
	var asset;
	var name;
	
	var list = [];
	
	var box = '<input type="text" class= "ltoName" value="">';
	var but = '<button type ="button" class="addLTO">LTO</button>';
	
	var inputLTO = "<div class='inputLTO'>" +  box + but +  "</div>";
	
	
	$.get('/laptops', {}, function(data){
		//console.log("Get request sent");
		console.log("Response.. ");
		for(var i = 0; i < data.length; i++){
			list.push({
				id: data[i].id,
				asset: data[i].asset,
				name: data[i].name,
				lto: data[i].lto,
				school: data[i].school,
				hasLTO: false
			});
			
			var placeholder;
			if(list[i].lto == null){
				placeholder = "";
				list[i].hasLTO = false;
			}
			else{
				placeholder = "<div class = 'ltoName'>" + list[i].lto + "</div>";
				list[i].hasLTO = true;
			}
			
			
			
			
			
			
		
			var info =
				"<td>" + list[i].name + placeholder + "</td>"+ 
				"<td>" + list[i].asset + "</td>" +
				"<td>" + list[i].school + "</td>" + 
				"<td>" + inputLTO + "</td>";
				
			
			
			line = "<tr id = '" + list[i].id +  "'>" + info + "</tr>";
			
		//	console.log(line);

			$('#display').append(line);
			
			if(list[i].hasLTO == true){
				$('#' + list[i].id + "").addClass('withLTO');
			
			}
		}	
	});
	
	


	
	//enter lto 
	$(document).on('click', '.addLTO', function(){
		console.log($(this).prev().val());
		var input = $(this).prev().val();
		
		//this grabs the id of the specific dom element
		var $id = $(this).parent().parent().parent().attr('id');
		console.log($id);
		
		
		
		$.ajax({
			method: 'PUT',
			data: {i: input},
			url: '/laptops/' + $id,
			success: function(result){
				console.log("Refreshing");
				location.reload(true);

			}
		});
		
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
	
			
			