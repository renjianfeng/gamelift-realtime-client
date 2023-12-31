/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

import * as jspb from 'google-protobuf';
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.com.gamelift.rt.proto.GroupMembershipUpdate', null, global);
goog.exportSymbol('proto.com.gamelift.rt.proto.JoinGroup', null, global);
goog.exportSymbol('proto.com.gamelift.rt.proto.LeaveGroup', null, global);
goog.exportSymbol('proto.com.gamelift.rt.proto.RequestGroupMembership', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.com.gamelift.rt.proto.JoinGroup = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.com.gamelift.rt.proto.JoinGroup, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.com.gamelift.rt.proto.JoinGroup.displayName = 'proto.com.gamelift.rt.proto.JoinGroup';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.com.gamelift.rt.proto.JoinGroup.prototype.toObject = function(opt_includeInstance) {
  return proto.com.gamelift.rt.proto.JoinGroup.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.com.gamelift.rt.proto.JoinGroup} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.com.gamelift.rt.proto.JoinGroup.toObject = function(includeInstance, msg) {
  var f, obj = {
    group: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.com.gamelift.rt.proto.JoinGroup}
 */
proto.com.gamelift.rt.proto.JoinGroup.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.com.gamelift.rt.proto.JoinGroup;
  return proto.com.gamelift.rt.proto.JoinGroup.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.com.gamelift.rt.proto.JoinGroup} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.com.gamelift.rt.proto.JoinGroup}
 */
proto.com.gamelift.rt.proto.JoinGroup.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setGroup(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.com.gamelift.rt.proto.JoinGroup.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.com.gamelift.rt.proto.JoinGroup.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.com.gamelift.rt.proto.JoinGroup} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.com.gamelift.rt.proto.JoinGroup.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getGroup();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
};


/**
 * optional int32 group = 1;
 * @return {number}
 */
proto.com.gamelift.rt.proto.JoinGroup.prototype.getGroup = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.com.gamelift.rt.proto.JoinGroup.prototype.setGroup = function(value) {
  jspb.Message.setProto3IntField(this, 1, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.com.gamelift.rt.proto.LeaveGroup = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.com.gamelift.rt.proto.LeaveGroup, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.com.gamelift.rt.proto.LeaveGroup.displayName = 'proto.com.gamelift.rt.proto.LeaveGroup';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.com.gamelift.rt.proto.LeaveGroup.prototype.toObject = function(opt_includeInstance) {
  return proto.com.gamelift.rt.proto.LeaveGroup.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.com.gamelift.rt.proto.LeaveGroup} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.com.gamelift.rt.proto.LeaveGroup.toObject = function(includeInstance, msg) {
  var f, obj = {
    group: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.com.gamelift.rt.proto.LeaveGroup}
 */
proto.com.gamelift.rt.proto.LeaveGroup.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.com.gamelift.rt.proto.LeaveGroup;
  return proto.com.gamelift.rt.proto.LeaveGroup.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.com.gamelift.rt.proto.LeaveGroup} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.com.gamelift.rt.proto.LeaveGroup}
 */
proto.com.gamelift.rt.proto.LeaveGroup.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setGroup(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.com.gamelift.rt.proto.LeaveGroup.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.com.gamelift.rt.proto.LeaveGroup.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.com.gamelift.rt.proto.LeaveGroup} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.com.gamelift.rt.proto.LeaveGroup.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getGroup();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
};


/**
 * optional int32 group = 1;
 * @return {number}
 */
proto.com.gamelift.rt.proto.LeaveGroup.prototype.getGroup = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.com.gamelift.rt.proto.LeaveGroup.prototype.setGroup = function(value) {
  jspb.Message.setProto3IntField(this, 1, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.com.gamelift.rt.proto.RequestGroupMembership = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.com.gamelift.rt.proto.RequestGroupMembership, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.com.gamelift.rt.proto.RequestGroupMembership.displayName = 'proto.com.gamelift.rt.proto.RequestGroupMembership';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.com.gamelift.rt.proto.RequestGroupMembership.prototype.toObject = function(opt_includeInstance) {
  return proto.com.gamelift.rt.proto.RequestGroupMembership.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.com.gamelift.rt.proto.RequestGroupMembership} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.com.gamelift.rt.proto.RequestGroupMembership.toObject = function(includeInstance, msg) {
  var f, obj = {
    group: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.com.gamelift.rt.proto.RequestGroupMembership}
 */
proto.com.gamelift.rt.proto.RequestGroupMembership.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.com.gamelift.rt.proto.RequestGroupMembership;
  return proto.com.gamelift.rt.proto.RequestGroupMembership.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.com.gamelift.rt.proto.RequestGroupMembership} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.com.gamelift.rt.proto.RequestGroupMembership}
 */
proto.com.gamelift.rt.proto.RequestGroupMembership.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setGroup(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.com.gamelift.rt.proto.RequestGroupMembership.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.com.gamelift.rt.proto.RequestGroupMembership.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.com.gamelift.rt.proto.RequestGroupMembership} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.com.gamelift.rt.proto.RequestGroupMembership.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getGroup();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
};


/**
 * optional int32 group = 1;
 * @return {number}
 */
proto.com.gamelift.rt.proto.RequestGroupMembership.prototype.getGroup = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.com.gamelift.rt.proto.RequestGroupMembership.prototype.setGroup = function(value) {
  jspb.Message.setProto3IntField(this, 1, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.com.gamelift.rt.proto.GroupMembershipUpdate = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.com.gamelift.rt.proto.GroupMembershipUpdate.repeatedFields_, null);
};
goog.inherits(proto.com.gamelift.rt.proto.GroupMembershipUpdate, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.com.gamelift.rt.proto.GroupMembershipUpdate.displayName = 'proto.com.gamelift.rt.proto.GroupMembershipUpdate';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.com.gamelift.rt.proto.GroupMembershipUpdate.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.com.gamelift.rt.proto.GroupMembershipUpdate.prototype.toObject = function(opt_includeInstance) {
  return proto.com.gamelift.rt.proto.GroupMembershipUpdate.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.com.gamelift.rt.proto.GroupMembershipUpdate} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.com.gamelift.rt.proto.GroupMembershipUpdate.toObject = function(includeInstance, msg) {
  var f, obj = {
    group: jspb.Message.getFieldWithDefault(msg, 1, 0),
    playersList: jspb.Message.getRepeatedField(msg, 2)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.com.gamelift.rt.proto.GroupMembershipUpdate}
 */
proto.com.gamelift.rt.proto.GroupMembershipUpdate.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.com.gamelift.rt.proto.GroupMembershipUpdate;
  return proto.com.gamelift.rt.proto.GroupMembershipUpdate.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.com.gamelift.rt.proto.GroupMembershipUpdate} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.com.gamelift.rt.proto.GroupMembershipUpdate}
 */
proto.com.gamelift.rt.proto.GroupMembershipUpdate.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setGroup(value);
      break;
    case 2:
      var value = /** @type {!Array<number>} */ (reader.readPackedInt32());
      msg.setPlayersList(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.com.gamelift.rt.proto.GroupMembershipUpdate.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.com.gamelift.rt.proto.GroupMembershipUpdate.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.com.gamelift.rt.proto.GroupMembershipUpdate} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.com.gamelift.rt.proto.GroupMembershipUpdate.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getGroup();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getPlayersList();
  if (f.length > 0) {
    writer.writePackedInt32(
      2,
      f
    );
  }
};


/**
 * optional int32 group = 1;
 * @return {number}
 */
proto.com.gamelift.rt.proto.GroupMembershipUpdate.prototype.getGroup = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.com.gamelift.rt.proto.GroupMembershipUpdate.prototype.setGroup = function(value) {
  jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * repeated int32 players = 2;
 * @return {!Array<number>}
 */
proto.com.gamelift.rt.proto.GroupMembershipUpdate.prototype.getPlayersList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 2));
};


/** @param {!Array<number>} value */
proto.com.gamelift.rt.proto.GroupMembershipUpdate.prototype.setPlayersList = function(value) {
  jspb.Message.setField(this, 2, value || []);
};


/**
 * @param {!number} value
 * @param {number=} opt_index
 */
proto.com.gamelift.rt.proto.GroupMembershipUpdate.prototype.addPlayers = function(value, opt_index) {
  jspb.Message.addToRepeatedField(this, 2, value, opt_index);
};


proto.com.gamelift.rt.proto.GroupMembershipUpdate.prototype.clearPlayersList = function() {
  this.setPlayersList([]);
};


// goog.object.extend(exports, proto.com.gamelift.rt.proto);
// Add custom named exports...
export const JoinGroup = proto.com.gamelift.rt.proto.JoinGroup;
export const LeaveGroup = proto.com.gamelift.rt.proto.LeaveGroup;
export const RequestGroupMembership = proto.com.gamelift.rt.proto.RequestGroupMembership;
export const GroupMembershipUpdate = proto.com.gamelift.rt.proto.GroupMembershipUpdate;
