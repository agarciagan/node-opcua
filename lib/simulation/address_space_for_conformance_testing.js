var NodeClass = require("./../datamodel/nodeclass").NodeClass;

var NodeId = require("../datamodel/nodeid").NodeId;
var resolveNodeId = require("../datamodel/nodeid").resolveNodeId;
var makeNodeId = require("../datamodel/nodeid").makeNodeId;
var NodeIdType = require("../datamodel/nodeid").NodeIdType;

var address_space = require("../address_space/address_space");
var AddressSpace = address_space.AddressSpace;
var ServerEngine = require("../server/server_engine").ServerEngine;

//var assert = require("better-assert");




var DataType =require("../datamodel/variant").DataType;

var ns = 411;

function add_var(server_engine,parent,dataTypeName,defaultValue) {

    assert(server_engine.address_space instanceof AddressSpace);
    var dataType = DataType[dataTypeName];
    assert(dataType !== null); // dataType must exists

    var name = parent.browseName + "_" + dataTypeName;
    var value = defaultValue;
    console.log("adding ",name);
    var variable = server_engine.addVariable(parent,{
        browseName: name,
        description: { locale: "en" , text: name},
        nodeId: makeNodeId(name,ns),
        value: {
            get: function(){ return value; },
            set: function(v){
                value =v;
            }
        }
    });
    return variable;
};

/**
 * @method build_address_space_for_conformance_testing
 * @param server_engine {ServerEngine}
 */
var build_address_space_for_conformance_testing;
build_address_space_for_conformance_testing = function (server_engine) {

    assert(server_engine instanceof ServerEngine);
    assert(server_engine.address_space instanceof AddressSpace);

    var objectsFolder = server_engine.findObject('ObjectsFolder');

    var scalarFolder = server_engine.createFolder(objectsFolder, {
        browseName: "Scalar"
    });

    var simulation = server_engine.addObjectInFolder(scalarFolder, {
        browseName: "Scalar_Simulation",
        description: "This folder will contain one item per supported data-type.",
        nodeId: makeNodeId(4000, ns)
    });
    var DateTime_Min = 0;

    add_var(server_engine, simulation, "Boolean", false);
    add_var(server_engine, simulation, "Byte", 0);
    add_var(server_engine, simulation, "ByteString", "OPCUA");
    add_var(server_engine, simulation, "DateTime", DateTime_Min);
    add_var(server_engine, simulation, "Double", 0.0);
    add_var(server_engine, simulation, "Duration", DateTime_Min);
    add_var(server_engine, simulation, "Float", 0.0);
    add_var(server_engine, simulation, "GUID", "");
    add_var(server_engine, simulation, "Int16", 0);
    add_var(server_engine, simulation, "Int32", 0);
    add_var(server_engine, simulation, "Int64", 0);
    add_var(server_engine, simulation, "Integer", 0);
    add_var(server_engine, simulation, "LocaleId", 0);
    add_var(server_engine, simulation, "LocalizedText", 0);
    add_var(server_engine, simulation, "NodeId", makeNodeId("ns=" + ns + ";g={00000000-0000-0000-0000-0000-00000023}"));
    add_var(server_engine, simulation, "Number", 0);
    add_var(server_engine, simulation, "QualifiedName", 0);
    add_var(server_engine, simulation, "SByte", 0);
    add_var(server_engine, simulation, "String", "OPCUA");
    add_var(server_engine, simulation, "Time", "00:00:00");
    add_var(server_engine, simulation, "UInt16", 0);
    add_var(server_engine, simulation, "UInt32", 0);
    add_var(server_engine, simulation, "UInt64", 0);
    add_var(server_engine, simulation, "UInteger", 0);
    add_var(server_engine, simulation, "UtcTime", 0);
    add_var(server_engine, simulation, "Variant", 0);
    add_var(server_engine, simulation, "XmlElement", "<string1>OPCUA</string1>");

    // add_var(address_space,simulation,"Interval", "The rate (in msec) of change for all Simulated items.",100);
    // add_var(address_space,simulation,"Enabled", true);


};
exports.build_address_space_for_conformance_testing = build_address_space_for_conformance_testing;