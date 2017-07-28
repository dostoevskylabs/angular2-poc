import { Component } from '@angular/core';
@Component({
  selector: 'my-app',
  template: '<div><input type="file" (change)="fileChange($event)"/></div><div id="output"></div>'
})
export class AppComponent{
	fileChange(event){
		var input = event.target.files[0];
		var reader = new FileReader();
		reader.onload = function(){
			var text = reader.result;
			var node = document.getElementById('output');
			jQuery.ajax({
				method: "POST",
				url: "http://127.0.0.1:8080/",
				data: JSON.stringify({"content": text, "contentType": input.type})
			}).done(function(data){
				node.innerText = data;
			});
		};
		reader.readAsText(input);
	};
}

