#pragma strict

var barPrefab : GameObject;
var labelStyle : GUIStyle;

private var numberOfBars = 12 * 2;
private var previousPoint = Vector3.zero;
private var spin = Quaternion.identity;

private var hour = 12;
private var minute = 0;

function Start() {
	for (var i = 0; i < numberOfBars; i++) {
		var rotation = Quaternion.AngleAxis(i * 360 / numberOfBars, Vector3.forward);
		var bar = Instantiate(barPrefab, Vector3.zero, rotation);
		bar.transform.parent = transform;
	}
}

function Update() {
	var mousePosition = Input.mousePosition;
	mousePosition.z = Camera.main.transform.position.magnitude;
	var point = Camera.main.ScreenToWorldPoint(mousePosition);

	if (Input.GetMouseButtonDown(0)) {
	} else if (Input.GetMouseButton(0)) {
		spin = Quaternion.FromToRotation(previousPoint, point);
	}

	transform.localRotation = spin * transform.localRotation;
	spin = Quaternion.Slerp(Quaternion.identity, spin, Mathf.Exp(-4.0 * Time.deltaTime));
	previousPoint = point;
	
	var zr = transform.localRotation.eulerAngles.z;
	hour = zr * 24 / 360;
	minute = 5 * Mathf.FloorToInt((zr * 24 * 12 / 360) % 12);
}

function OnGUI() {
	var time = "" + hour + ":" + (minute < 10 ? "0" : "") + minute;
	GUI.Label(Rect(0, 0, Screen.width, Screen.height), time, labelStyle);
}
