<!DOCTIME HTML>
<html>
<head>
 <title>Curling viewer</title>
 <script type="text/javascript" src="/js/curling.js"></script>
</head>
<body onload="onload()">
 <h1>Curling viewer</h1>
<table border="1" id="scoreboard">
<tr><td> &nbsp;</td> <td style="background-color:red; color:white">1 </td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td>&nbsp;</td><td>&nbsp;<td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>EE</td><td>EE</td><td>Total</td></tr>
<tr><td> &#x1f528;</td> <td id="second_player" style="background-color:yellow; color:black">2</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
</table>
<div id="control_panel" style="float:top">
 <form>
  <table>
  <tr>
  <td>End: <span id="end">1</span> Stone: <span id="stone">1</span></td>
  <td>
  <button type="button" onclick="ltltlt()"> &lt;&lt;&lt; </button>
  <button type="button" onclick="ltlt()"> &lt;&lt; </button>
  <button type="button" onclick="lt()"> &lt; </button>
  <button type="button" onclick="gt()"> &gt; </button>
  <button type="button" onclick="gtgt()"> &gt;&gt; </button>
  <button type="button" onclick="gtgtgt()"> &gt;&gt;&gt; </button>
  </td></tr>
  </table>
 </form>
</div>
<div id="canvas_soko_div" style="float:bottom">
 <canvas id="canvas_soko" width="400" height="1000"></canvas>
</div>
<pre id="log" style="display: none">
[GameInfo]
{{log}}
</pre>
</body>
</html>
