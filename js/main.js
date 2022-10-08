$(function(){
	var table = $("#tableConversion tbody");
	var numberinput = $("#baseInput");
	var resultO = $("#resultadoBase");
	var resultSM = $("#resultadoSM");
	var resultC1 = $("#resultadoC1");
	var original = $("#original");
	var textresult = $("#resultSeparated");
	// Reverse string
	function reverse(str){
	    var res = "";
	    for (var i = str.length - 1; i >= 0; i--)
	        res += (str[i]);
	    return res;
	}
	function SMCONVERT(str, flag){
		var _str = "";
		var packet_size = 16 - str.length;

		/*console.log("Size of data: " + str.length);
		console.log("Size of packet: " + (16 - str.length));*/
		if(str.length <= 15){
			for(var i = 0; i <= packet_size - 1; i++){
				if(flag == false && i == 0){
					_str += '1';
				}else{
					_str += '0';	
				}
				
			}	
		return _str + str;
		}else{
			alert("Byte overflow!")
			return "Byte overflow!";
		}
		
	}
	function CCONVERT(str){
		var _str = "";
		for(var i = 0; i <= str.length; i++){
			if(str[i] == '0'){
				_str += '1';
			}else{
				_str += '0';
			}
		}
		return _str;
	}
	// Add spans
	function addSpans(str){
		var data = str.match(/.{1,4}/g);
		data = data.join(' ');
		console.log(data);

		return data + "₂";
	}
	// Convertion function
	function DECBIN(num, flag)
	{
	    var str = "";
	    var aux = "";
	    var naux = 0;
	    var _num = !flag ? num * (-1) : num;
	    table.empty();
	    while(num){
	        // adding the result of num & 1 to str
	        if (num & 1){
	        	str += '1';
	        	aux = '1';
	        }else{
	        	str += '0';
	        	aux = '0';
	        }
	        naux = num;
	        naux = naux / 2;
	        markup = "<tr><td>" + naux + "</td><td><b>" + aux + "</b></td></tr>";
	        table.append(markup);
	        aux = "";
	        num >>= 1;
	    }
	    
	    var sm = (SMCONVERT(reverse(str), flag));
	    resultO.val(reverse(str));
	    resultSM.val(sm);
	    resultC1.val(CCONVERT(sm));
	    textresult.text(addSpans(sm));
	    original.text(_num.toString() + "₁₀");
	    addSpans(sm);

	    return str;
	}
	// Converter button
	$("#btnConvert").click(function(e){
		e.preventDefault();
		var _value = numberinput.val();
		if(_value >= 0){
			DECBIN(_value, true);	
		}else{
			DECBIN(_value * (-1), false);
		}
	});
});