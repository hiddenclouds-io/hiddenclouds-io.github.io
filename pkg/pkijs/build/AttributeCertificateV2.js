"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.AttributeCertificateInfoV2 = exports.Holder = exports.V2Form = exports.ObjectDigestInfo = undefined;

var _asn1js = require("asn1js");

var asn1js = _interopRequireWildcard(_asn1js);

var _pvutils = require("pvutils");

var _GeneralNames = require("./GeneralNames.js");

var _GeneralNames2 = _interopRequireDefault(_GeneralNames);

var _AlgorithmIdentifier = require("./AlgorithmIdentifier.js");

var _AlgorithmIdentifier2 = _interopRequireDefault(_AlgorithmIdentifier);

var _Attribute = require("./Attribute.js");

var _Attribute2 = _interopRequireDefault(_Attribute);

var _Extensions = require("./Extensions.js");

var _Extensions2 = _interopRequireDefault(_Extensions);

var _AttributeCertificateV = require("./AttributeCertificateV1.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//**************************************************************************************
/**
 * Class from RFC5755
 */
class ObjectDigestInfo {
	//**********************************************************************************
	/**
  * Constructor for ObjectDigestInfo class
  * @param {Object} [parameters={}]
  * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
  */
	constructor(parameters = {}) {
		//region Internal properties of the object
		/**
   * @type {Enumerated}
   * @desc digestedObjectType
   */
		this.digestedObjectType = (0, _pvutils.getParametersValue)(parameters, "digestedObjectType", ObjectDigestInfo.defaultValues("digestedObjectType"));

		if ("otherObjectTypeID" in parameters)
			/**
    * @type {ObjectIdentifier}
    * @desc otherObjectTypeID
    */
			this.otherObjectTypeID = (0, _pvutils.getParametersValue)(parameters, "otherObjectTypeID", ObjectDigestInfo.defaultValues("otherObjectTypeID"));

		/**
   * @type {AlgorithmIdentifier}
   * @desc digestAlgorithm
   */
		this.digestAlgorithm = (0, _pvutils.getParametersValue)(parameters, "digestAlgorithm", ObjectDigestInfo.defaultValues("digestAlgorithm"));
		/**
   * @type {BitString}
   * @desc objectDigest
   */
		this.objectDigest = (0, _pvutils.getParametersValue)(parameters, "objectDigest", ObjectDigestInfo.defaultValues("objectDigest"));
		//endregion

		//region If input argument array contains "schema" for this object
		if ("schema" in parameters) this.fromSchema(parameters.schema);
		//endregion
	}
	//**********************************************************************************
	/**
  * Return default values for all class members
  * @param {string} memberName String name for a class member
  */
	static defaultValues(memberName) {
		switch (memberName) {
			case "digestedObjectType":
				return new asn1js.Enumerated();
			case "otherObjectTypeID":
				return new asn1js.ObjectIdentifier();
			case "digestAlgorithm":
				return new _AlgorithmIdentifier2.default();
			case "objectDigest":
				return new asn1js.BitString();
			default:
				throw new Error(`Invalid member name for ObjectDigestInfo class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
  * Return value of pre-defined ASN.1 schema for current class
  *
  * ASN.1 schema:
  * ```asn1
  * ObjectDigestInfo ::= SEQUENCE {
  *   digestedObjectType  ENUMERATED {
  *     publicKey            (0),
  *     publicKeyCert        (1),
  *     otherObjectTypes     (2) },
  *   -- otherObjectTypes MUST NOT
  *   -- be used in this profile
  *   otherObjectTypeID   OBJECT IDENTIFIER OPTIONAL,
  *   digestAlgorithm     AlgorithmIdentifier,
  *   objectDigest        BIT STRING
  * }
  * ```
  *
  * @param {Object} parameters Input parameters for the schema
  * @returns {Object} asn1js schema object
  */
	static schema(parameters = {}) {
		/**
   * @type {Object}
   * @property {string} [blockName]
   * @property {string} [digestedObjectType]
   * @property {string} [otherObjectTypeID]
   * @property {string} [digestAlgorithm]
   * @property {string} [objectDigest]
   */
		const names = (0, _pvutils.getParametersValue)(parameters, "names", {});

		return new asn1js.Sequence({
			name: names.blockName || "",
			value: [new asn1js.Enumerated({ name: names.digestedObjectType || "" }), new asn1js.ObjectIdentifier({
				optional: true,
				name: names.otherObjectTypeID || ""
			}), _AlgorithmIdentifier2.default.schema(names.digestAlgorithm || {}), new asn1js.BitString({ name: names.objectDigest || "" })]
		});
	}
	//**********************************************************************************
	/**
  * Convert parsed asn1js object into current class
  * @param {!Object} schema
  */
	fromSchema(schema) {
		//region Clear input data first
		(0, _pvutils.clearProps)(schema, ["digestedObjectType", "otherObjectTypeID", "digestAlgorithm", "objectDigest"]);
		//endregion

		//region Check the schema is valid
		const asn1 = asn1js.compareSchema(schema, schema, ObjectDigestInfo.schema({
			names: {
				digestedObjectType: "digestedObjectType",
				otherObjectTypeID: "otherObjectTypeID",
				digestAlgorithm: {
					names: {
						blockName: "digestAlgorithm"
					}
				},
				objectDigest: "objectDigest"
			}
		}));

		if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for ObjectDigestInfo");
		//endregion

		//region Get internal properties from parsed schema
		this.digestedObjectType = asn1.result.digestedObjectType;

		if ("otherObjectTypeID" in asn1.result) this.otherObjectTypeID = asn1.result.otherObjectTypeID;

		this.digestAlgorithm = new _AlgorithmIdentifier2.default({ schema: asn1.result.digestAlgorithm });
		this.objectDigest = asn1.result.objectDigest;
		//endregion
	}
	//**********************************************************************************
	/**
  * Convert current object to asn1js object and set correct values
  * @returns {Object} asn1js object
  */
	toSchema() {
		const result = new asn1js.Sequence({
			value: [this.digestedObjectType]
		});

		if ("otherObjectTypeID" in this) result.value.push(this.otherObjectTypeID);

		result.value.push(this.digestAlgorithm.toSchema());
		result.value.push(this.objectDigest);

		return result;
	}
	//**********************************************************************************
	/**
  * Convertion for the class to JSON object
  * @returns {Object}
  */
	toJSON() {
		const result = {
			digestedObjectType: this.digestedObjectType.toJSON()
		};

		if ("otherObjectTypeID" in this) result.otherObjectTypeID = this.otherObjectTypeID.toJSON();

		result.digestAlgorithm = this.digestAlgorithm.toJSON();
		result.objectDigest = this.objectDigest.toJSON();

		return result;
	}
	//**********************************************************************************
}
exports.ObjectDigestInfo = ObjectDigestInfo; //**************************************************************************************
/**
 * Class from RFC5755
 */

class V2Form {
	//**********************************************************************************
	/**
  * Constructor for V2Form class
  * @param {Object} [parameters={}]
  * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
  */
	constructor(parameters = {}) {
		//region Internal properties of the object
		if ("issuerName" in parameters)
			/**
    * @type {GeneralNames}
    * @desc issuerName
    */
			this.issuerName = (0, _pvutils.getParametersValue)(parameters, "issuerName", V2Form.defaultValues("issuerName"));

		if ("baseCertificateID" in parameters)
			/**
    * @type {IssuerSerial}
    * @desc baseCertificateID
    */
			this.baseCertificateID = (0, _pvutils.getParametersValue)(parameters, "baseCertificateID", V2Form.defaultValues("baseCertificateID"));

		if ("objectDigestInfo" in parameters)
			/**
    * @type {ObjectDigestInfo}
    * @desc objectDigestInfo
    */
			this.objectDigestInfo = (0, _pvutils.getParametersValue)(parameters, "objectDigestInfo", V2Form.defaultValues("objectDigestInfo"));
		//endregion

		//region If input argument array contains "schema" for this object
		if ("schema" in parameters) this.fromSchema(parameters.schema);
		//endregion
	}
	//**********************************************************************************
	/**
  * Return default values for all class members
  * @param {string} memberName String name for a class member
  */
	static defaultValues(memberName) {
		switch (memberName) {
			case "issuerName":
				return new _GeneralNames2.default();
			case "baseCertificateID":
				return new _AttributeCertificateV.IssuerSerial();
			case "objectDigestInfo":
				return new ObjectDigestInfo();
			default:
				throw new Error(`Invalid member name for V2Form class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
  * Return value of pre-defined ASN.1 schema for current class
  *
  * ASN.1 schema:
  * ```asn1
  * V2Form ::= SEQUENCE {
  *   issuerName            GeneralNames  OPTIONAL,
  *   baseCertificateID     [0] IssuerSerial  OPTIONAL,
  *   objectDigestInfo      [1] ObjectDigestInfo  OPTIONAL
  *     -- issuerName MUST be present in this profile
  *     -- baseCertificateID and objectDigestInfo MUST NOT
  *     -- be present in this profile
  * }
  * ```
  *
  * @param {Object} parameters Input parameters for the schema
  * @returns {Object} asn1js schema object
  */
	static schema(parameters = {}) {
		/**
   * @type {Object}
   * @property {string} [blockName]
   * @property {string} [issuerName]
   * @property {string} [baseCertificateID]
   * @property {string} [objectDigestInfo]
   */
		const names = (0, _pvutils.getParametersValue)(parameters, "names", {});

		return new asn1js.Sequence({
			name: names.blockName || "",
			value: [_GeneralNames2.default.schema({
				names: {
					blockName: names.issuerName
				}
			}, true), new asn1js.Constructed({
				optional: true,
				name: names.baseCertificateID || "",
				idBlock: {
					tagClass: 3,
					tagNumber: 0 // [0]
				},
				value: _AttributeCertificateV.IssuerSerial.schema().valueBlock.value
			}), new asn1js.Constructed({
				optional: true,
				name: names.objectDigestInfo || "",
				idBlock: {
					tagClass: 3,
					tagNumber: 1 // [1]
				},
				value: ObjectDigestInfo.schema().valueBlock.value
			})]
		});
	}
	//**********************************************************************************
	/**
  * Convert parsed asn1js object into current class
  * @param {!Object} schema
  */
	fromSchema(schema) {
		//region Clear input data first
		(0, _pvutils.clearProps)(schema, ["issuerName", "baseCertificateID", "objectDigestInfo"]);
		//endregion

		//region Check the schema is valid
		const asn1 = asn1js.compareSchema(schema, schema, V2Form.schema({
			names: {
				issuerName: "issuerName",
				baseCertificateID: "baseCertificateID",
				objectDigestInfo: "objectDigestInfo"
			}
		}));

		if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for V2Form");
		//endregion

		//region Get internal properties from parsed schema
		if ("issuerName" in asn1.result) this.issuerName = new _GeneralNames2.default({ schema: asn1.result.issuerName });

		if ("baseCertificateID" in asn1.result) {
			this.baseCertificateID = new _AttributeCertificateV.IssuerSerial({
				schema: new asn1js.Sequence({
					value: asn1.result.baseCertificateID.valueBlock.value
				})
			});
		}

		if ("objectDigestInfo" in asn1.result) {
			this.objectDigestInfo = new ObjectDigestInfo({
				schema: new asn1js.Sequence({
					value: asn1.result.objectDigestInfo.valueBlock.value
				})
			});
		}
		//endregion
	}
	//**********************************************************************************
	/**
  * Convert current object to asn1js object and set correct values
  * @returns {Object} asn1js object
  */
	toSchema() {
		const result = new asn1js.Sequence();

		if ("issuerName" in this) result.valueBlock.value.push(this.issuerName.toSchema());

		if ("baseCertificateID" in this) {
			result.valueBlock.value.push(new asn1js.Constructed({
				idBlock: {
					tagClass: 3,
					tagNumber: 0 // [0]
				},
				value: this.baseCertificateID.toSchema().valueBlock.value
			}));
		}

		if ("objectDigestInfo" in this) {
			result.valueBlock.value.push(new asn1js.Constructed({
				idBlock: {
					tagClass: 3,
					tagNumber: 1 // [1]
				},
				value: this.objectDigestInfo.toSchema().valueBlock.value
			}));
		}

		//region Construct and return new ASN.1 schema for this object
		return result;
		//endregion
	}
	//**********************************************************************************
	/**
  * Convertion for the class to JSON object
  * @returns {Object}
  */
	toJSON() {
		const result = {};

		if ("issuerName" in this) result.issuerName = this.issuerName.toJSON();

		if ("baseCertificateID" in this) result.baseCertificateID = this.baseCertificateID.toJSON();

		if ("objectDigestInfo" in this) result.objectDigestInfo = this.objectDigestInfo.toJSON();

		return result;
	}
	//**********************************************************************************
}
exports.V2Form = V2Form; //**************************************************************************************
/**
 * Class from RFC5755
 */

class Holder {
	//**********************************************************************************
	/**
  * Constructor for Holder class
  * @param {Object} [parameters={}]
  * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
  */
	constructor(parameters = {}) {
		//region Internal properties of the object
		if ("baseCertificateID" in parameters)
			/**
    * @type {IssuerSerial}
    * @desc baseCertificateID
    */
			this.baseCertificateID = (0, _pvutils.getParametersValue)(parameters, "baseCertificateID", Holder.defaultValues("baseCertificateID"));

		if ("entityName" in parameters)
			/**
    * @type {GeneralNames}
    * @desc entityName
    */
			this.entityName = (0, _pvutils.getParametersValue)(parameters, "entityName", Holder.defaultValues("entityName"));

		if ("objectDigestInfo" in parameters)
			/**
    * @type {ObjectDigestInfo}
    * @desc objectDigestInfo
    */
			this.objectDigestInfo = (0, _pvutils.getParametersValue)(parameters, "objectDigestInfo", Holder.defaultValues("objectDigestInfo"));
		//endregion

		//region If input argument array contains "schema" for this object
		if ("schema" in parameters) this.fromSchema(parameters.schema);
		//endregion
	}
	//**********************************************************************************
	/**
  * Return default values for all class members
  * @param {string} memberName String name for a class member
  */
	static defaultValues(memberName) {
		switch (memberName) {
			case "baseCertificateID":
				return new _AttributeCertificateV.IssuerSerial();
			case "entityName":
				return new _GeneralNames2.default();
			case "objectDigestInfo":
				return new ObjectDigestInfo();
			default:
				throw new Error(`Invalid member name for Holder class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
  * Return value of pre-defined ASN.1 schema for current class
  *
  * ASN.1 schema:
  * ```asn1
  * Holder ::= SEQUENCE {
  *   baseCertificateID   [0] IssuerSerial OPTIONAL,
  *       -- the issuer and serial number of
  *       -- the holder's Public Key Certificate
  *   entityName          [1] GeneralNames OPTIONAL,
  *       -- the name of the claimant or role
  *   objectDigestInfo    [2] ObjectDigestInfo OPTIONAL
  *       -- used to directly authenticate the holder,
  *       -- for example, an executable
  * }
  * ```
  *
  * @param {Object} parameters Input parameters for the schema
  * @returns {Object} asn1js schema object
  */
	static schema(parameters = {}) {
		/**
   * @type {Object}
   * @property {string} [blockName]
   * @property {string} [baseCertificateID]
   * @property {string} [entityName]
   * @property {string} [objectDigestInfo]
   */
		const names = (0, _pvutils.getParametersValue)(parameters, "names", {});

		return new asn1js.Sequence({
			name: names.blockName || "",
			value: [new asn1js.Constructed({
				optional: true,
				name: names.baseCertificateID || "",
				idBlock: {
					tagClass: 3,
					tagNumber: 0 // [0]
				},
				value: _AttributeCertificateV.IssuerSerial.schema().valueBlock.value
			}), new asn1js.Constructed({
				optional: true,
				name: names.entityName || "",
				idBlock: {
					tagClass: 3,
					tagNumber: 1 // [2]
				},
				value: _GeneralNames2.default.schema().valueBlock.value
			}), new asn1js.Constructed({
				optional: true,
				name: names.objectDigestInfo || "",
				idBlock: {
					tagClass: 3,
					tagNumber: 2 // [2]
				},
				value: ObjectDigestInfo.schema().valueBlock.value
			})]
		});
	}
	//**********************************************************************************
	/**
  * Convert parsed asn1js object into current class
  * @param {!Object} schema
  */
	fromSchema(schema) {
		//region Clear input data first
		(0, _pvutils.clearProps)(schema, ["baseCertificateID", "entityName", "objectDigestInfo"]);
		//endregion

		//region Check the schema is valid
		const asn1 = asn1js.compareSchema(schema, schema, Holder.schema({
			names: {
				baseCertificateID: "baseCertificateID",
				entityName: "entityName",
				objectDigestInfo: "objectDigestInfo"
			}
		}));

		if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for Holder");
		//endregion

		//region Get internal properties from parsed schema
		if ("baseCertificateID" in asn1.result) {
			this.baseCertificateID = new _AttributeCertificateV.IssuerSerial({
				schema: new asn1js.Sequence({
					value: asn1.result.baseCertificateID.valueBlock.value
				})
			});
		}

		if ("entityName" in asn1.result) {
			this.entityName = new _GeneralNames2.default({
				schema: new asn1js.Sequence({
					value: asn1.result.entityName.valueBlock.value
				})
			});
		}

		if ("objectDigestInfo" in asn1.result) {
			this.objectDigestInfo = new ObjectDigestInfo({
				schema: new asn1js.Sequence({
					value: asn1.result.objectDigestInfo.valueBlock.value
				})
			});
		}
		//endregion
	}
	//**********************************************************************************
	/**
  * Convert current object to asn1js object and set correct values
  * @returns {Object} asn1js object
  */
	toSchema() {
		const result = new asn1js.Sequence();

		if ("baseCertificateID" in this) {
			result.valueBlock.value.push(new asn1js.Constructed({
				idBlock: {
					tagClass: 3,
					tagNumber: 0 // [0]
				},
				value: this.baseCertificateID.toSchema().valueBlock.value
			}));
		}

		if ("entityName" in this) {
			result.valueBlock.value.push(new asn1js.Constructed({
				idBlock: {
					tagClass: 3,
					tagNumber: 1 // [1]
				},
				value: this.entityName.toSchema().valueBlock.value
			}));
		}

		if ("objectDigestInfo" in this) {
			result.valueBlock.value.push(new asn1js.Constructed({
				idBlock: {
					tagClass: 3,
					tagNumber: 2 // [2]
				},
				value: this.objectDigestInfo.toSchema().valueBlock.value
			}));
		}

		return result;
	}
	//**********************************************************************************
	/**
  * Convertion for the class to JSON object
  * @returns {Object}
  */
	toJSON() {
		const result = {};

		if ("baseCertificateID" in this) result.baseCertificateID = this.baseCertificateID.toJSON();

		if ("entityName" in this) result.entityName = this.entityName.toJSON();

		if ("objectDigestInfo" in this) result.objectDigestInfo = this.objectDigestInfo.toJSON();

		return result;
	}
	//**********************************************************************************
}
exports.Holder = Holder; //**************************************************************************************
/**
 * Class from RFC5755
 */

class AttributeCertificateInfoV2 {
	//**********************************************************************************
	/**
  * Constructor for AttributeCertificateInfoV2 class
  * @param {Object} [parameters={}]
  * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
  */
	constructor(parameters = {}) {
		//region Internal properties of the object
		/**
   * @type {Number}
   * @desc version
   */
		this.version = (0, _pvutils.getParametersValue)(parameters, "version", AttributeCertificateInfoV2.defaultValues("version"));
		/**
   * @type {Holder}
   * @desc holder
   */
		this.holder = (0, _pvutils.getParametersValue)(parameters, "holder", AttributeCertificateInfoV2.defaultValues("holder"));
		/**
   * @type {GeneralNames|V2Form}
   * @desc issuer
   */
		this.issuer = (0, _pvutils.getParametersValue)(parameters, "issuer", AttributeCertificateInfoV2.defaultValues("issuer"));
		/**
   * @type {AlgorithmIdentifier}
   * @desc signature
   */
		this.signature = (0, _pvutils.getParametersValue)(parameters, "signature", AttributeCertificateInfoV2.defaultValues("signature"));
		/**
   * @type {Integer}
   * @desc serialNumber
   */
		this.serialNumber = (0, _pvutils.getParametersValue)(parameters, "serialNumber", AttributeCertificateInfoV2.defaultValues("serialNumber"));
		/**
   * @type {AttCertValidityPeriod}
   * @desc attrCertValidityPeriod
   */
		this.attrCertValidityPeriod = (0, _pvutils.getParametersValue)(parameters, "attrCertValidityPeriod", AttributeCertificateInfoV2.defaultValues("attrCertValidityPeriod"));
		/**
   * @type {Array.<Attribute>}
   * @desc attributes
   */
		this.attributes = (0, _pvutils.getParametersValue)(parameters, "attributes", AttributeCertificateInfoV2.defaultValues("attributes"));

		if ("issuerUniqueID" in parameters)
			/**
    * @type {BitString}
    * @desc issuerUniqueID
    */
			this.issuerUniqueID = (0, _pvutils.getParametersValue)(parameters, "issuerUniqueID", AttributeCertificateInfoV2.defaultValues("issuerUniqueID"));

		if ("extensions" in parameters)
			/**
    * @type {Extensions}
    * @desc extensions
    */
			this.extensions = (0, _pvutils.getParametersValue)(parameters, "extensions", AttributeCertificateInfoV2.defaultValues("extensions"));
		//endregion

		//region If input argument array contains "schema" for this object
		if ("schema" in parameters) this.fromSchema(parameters.schema);
		//endregion
	}
	//**********************************************************************************
	/**
  * Return default values for all class members
  * @param {string} memberName String name for a class member
  */
	static defaultValues(memberName) {
		switch (memberName) {
			case "version":
				return 1;
			case "holder":
				return new Holder();
			case "issuer":
				return {};
			case "signature":
				return new _AlgorithmIdentifier2.default();
			case "serialNumber":
				return new asn1js.Integer();
			case "attrCertValidityPeriod":
				return new _AttributeCertificateV.AttCertValidityPeriod();
			case "attributes":
				return [];
			case "issuerUniqueID":
				return new asn1js.BitString();
			case "extensions":
				return new _Extensions2.default();
			default:
				throw new Error(`Invalid member name for AttributeCertificateInfoV2 class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
  * Return value of pre-defined ASN.1 schema for current class
  *
  * ASN.1 schema:
  * ```asn1
  * AttributeCertificateInfoV2 ::= SEQUENCE {
  *   version                 AttCertVersion, -- version is v2
  *   holder                  Holder,
  *   issuer                  AttCertIssuer,
  *   signature               AlgorithmIdentifier,
  *   serialNumber            CertificateSerialNumber,
  *   attrCertValidityPeriod  AttCertValidityPeriod,
  *   attributes              SEQUENCE OF Attribute,
  *   issuerUniqueID          UniqueIdentifier OPTIONAL,
  *   extensions              Extensions OPTIONAL
  * }
  * ```
  *
  * @param {Object} parameters Input parameters for the schema
  * @returns {Object} asn1js schema object
  */
	static schema(parameters = {}) {
		/**
   * @type {Object}
   * @property {string} [blockName]
   * @property {string} [issuer]
   * @property {string} [serialNumber]
   */
		const names = (0, _pvutils.getParametersValue)(parameters, "names", {});

		return new asn1js.Sequence({
			name: names.blockName || "",
			value: [new asn1js.Integer({ name: names.version || "" }), Holder.schema(names.holder || {}), new asn1js.Choice({
				value: [_GeneralNames2.default.schema({
					names: {
						blockName: names.issuer || ""
					}
				}), new asn1js.Constructed({
					name: names.issuer || "",
					idBlock: {
						tagClass: 3, // CONTEXT-SPECIFIC
						tagNumber: 0 // [0]
					},
					value: V2Form.schema().valueBlock.value
				})]
			}), _AlgorithmIdentifier2.default.schema(names.signature || {}), new asn1js.Integer({ name: names.serialNumber || "" }), _AttributeCertificateV.AttCertValidityPeriod.schema(names.attrCertValidityPeriod || {}), new asn1js.Sequence({
				name: names.attributes || "",
				value: [new asn1js.Repeated({
					value: _Attribute2.default.schema()
				})]
			}), new asn1js.BitString({
				optional: true,
				name: names.issuerUniqueID || ""
			}), _Extensions2.default.schema(names.extensions || {}, true)]
		});
	}
	//**********************************************************************************
	/**
  * Convert parsed asn1js object into current class
  * @param {!Object} schema
  */
	fromSchema(schema) {
		//region Clear input data first
		(0, _pvutils.clearProps)(schema, ["version", "holder", "issuer", "signature", "serialNumber", "attrCertValidityPeriod", "attributes", "issuerUniqueID", "extensions"]);
		//endregion

		//region Check the schema is valid
		const asn1 = asn1js.compareSchema(schema, schema, AttributeCertificateInfoV2.schema({
			names: {
				version: "version",
				holder: {
					names: {
						blockName: "holder"
					}
				},
				issuer: "issuer",
				signature: {
					names: {
						blockName: "signature"
					}
				},
				serialNumber: "serialNumber",
				attrCertValidityPeriod: {
					names: {
						blockName: "attrCertValidityPeriod"
					}
				},
				attributes: "attributes",
				issuerUniqueID: "issuerUniqueID",
				extensions: {
					names: {
						blockName: "extensions"
					}
				}
			}
		}));

		if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for AttributeCertificateInfoV2");
		//endregion

		//region Get internal properties from parsed schema
		this.version = asn1.result.version.valueBlock.valueDec;
		this.holder = new Holder({ schema: asn1.result.holder });

		switch (asn1.result.issuer.idBlock.tagClass) {
			case 3:
				// V2Form
				this.issuer = new V2Form({
					schema: new asn1js.Sequence({
						value: asn1.result.issuer.valueBlock.value
					})
				});
				break;
			case 1: // GeneralNames (should not be used)
			default:
				throw new Error("Incorect value for 'issuer' in AttributeCertificateInfoV2");
		}

		this.signature = new _AlgorithmIdentifier2.default({ schema: asn1.result.signature });
		this.serialNumber = asn1.result.serialNumber;
		this.attrCertValidityPeriod = new _AttributeCertificateV.AttCertValidityPeriod({ schema: asn1.result.attrCertValidityPeriod });
		this.attributes = Array.from(asn1.result.attributes.valueBlock.value, element => new _Attribute2.default({ schema: element }));

		if ("issuerUniqueID" in asn1.result) this.issuerUniqueID = asn1.result.issuerUniqueID;

		if ("extensions" in asn1.result) this.extensions = new _Extensions2.default({ schema: asn1.result.extensions });
		//endregion
	}
	//**********************************************************************************
	/**
  * Convert current object to asn1js object and set correct values
  * @returns {Object} asn1js object
  */
	toSchema() {
		const result = new asn1js.Sequence({
			value: [new asn1js.Integer({ value: this.version }), this.holder.toSchema(), new asn1js.Constructed({
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 0 // [0]
				},
				value: this.issuer.toSchema().valueBlock.value
			}), this.signature.toSchema(), this.serialNumber, this.attrCertValidityPeriod.toSchema(), new asn1js.Sequence({
				value: Array.from(this.attributes, element => element.toSchema())
			})]
		});

		if ("issuerUniqueID" in this) result.valueBlock.value.push(this.issuerUniqueID);

		if ("extensions" in this) result.valueBlock.value.push(this.extensions.toSchema());

		return result;
	}
	//**********************************************************************************
	/**
  * Convertion for the class to JSON object
  * @returns {Object}
  */
	toJSON() {
		const result = {
			version: this.version,
			holder: this.holder.toJSON(),
			issuer: this.issuer.toJSON(),
			signature: this.signature.toJSON(),
			serialNumber: this.serialNumber.toJSON(),
			attrCertValidityPeriod: this.attrCertValidityPeriod.toJSON(),
			attributes: Array.from(this.attributes, element => element.toJSON())
		};

		if ("issuerUniqueID" in this) result.issuerUniqueID = this.issuerUniqueID.toJSON();

		if ("extensions" in this) result.extensions = this.extensions.toJSON();

		return result;
	}
	//**********************************************************************************
}
exports.AttributeCertificateInfoV2 = AttributeCertificateInfoV2; //**************************************************************************************
/**
 * Class from RFC5755
 */

class AttributeCertificateV2 {
	//**********************************************************************************
	/**
  * Constructor for AttributeCertificateV2 class
  * @param {Object} [parameters={}]
  * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
  */
	constructor(parameters = {}) {
		//region Internal properties of the object
		/**
   * @type {AttributeCertificateInfoV2}
   * @desc acinfo
   */
		this.acinfo = (0, _pvutils.getParametersValue)(parameters, "acinfo", AttributeCertificateV2.defaultValues("acinfo"));
		/**
   * @type {AlgorithmIdentifier}
   * @desc signatureAlgorithm
   */
		this.signatureAlgorithm = (0, _pvutils.getParametersValue)(parameters, "signatureAlgorithm", AttributeCertificateV2.defaultValues("signatureAlgorithm"));
		/**
   * @type {BitString}
   * @desc signatureValue
   */
		this.signatureValue = (0, _pvutils.getParametersValue)(parameters, "signatureValue", AttributeCertificateV2.defaultValues("signatureValue"));
		//endregion

		//region If input argument array contains "schema" for this object
		if ("schema" in parameters) this.fromSchema(parameters.schema);
		//endregion
	}
	//**********************************************************************************
	/**
  * Return default values for all class members
  * @param {string} memberName String name for a class member
  */
	static defaultValues(memberName) {
		switch (memberName) {
			case "acinfo":
				return new AttributeCertificateInfoV2();
			case "signatureAlgorithm":
				return new _AlgorithmIdentifier2.default();
			case "signatureValue":
				return new asn1js.BitString();
			default:
				throw new Error(`Invalid member name for AttributeCertificateV2 class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
  * Return value of pre-defined ASN.1 schema for current class
  *
  * ASN.1 schema:
  * ```asn1
  * AttributeCertificate ::= SEQUENCE {
  *   acinfo               AttributeCertificateInfoV2,
  *   signatureAlgorithm   AlgorithmIdentifier,
  *   signatureValue       BIT STRING
  * }
  * ```
  *
  * @param {Object} parameters Input parameters for the schema
  * @returns {Object} asn1js schema object
  */
	static schema(parameters = {}) {
		/**
   * @type {Object}
   * @property {string} [blockName]
   * @property {Object} [acinfo]
   * @property {Object} [signatureAlgorithm]
   * @property {string} [signatureValue]
   */
		const names = (0, _pvutils.getParametersValue)(parameters, "names", {});

		return new asn1js.Sequence({
			name: names.blockName || "",
			value: [AttributeCertificateInfoV2.schema(names.acinfo || {}), _AlgorithmIdentifier2.default.schema(names.signatureAlgorithm || {}), new asn1js.BitString({ name: names.signatureValue || "" })]
		});
	}
	//**********************************************************************************
	/**
  * Convert parsed asn1js object into current class
  * @param {!Object} schema
  */
	fromSchema(schema) {
		//region Clear input data first
		(0, _pvutils.clearProps)(schema, ["acinfo", "signatureAlgorithm", "signatureValue"]);
		//endregion

		//region Check the schema is valid
		const asn1 = asn1js.compareSchema(schema, schema, AttributeCertificateV2.schema({
			names: {
				acinfo: {
					names: {
						blockName: "acinfo"
					}
				},
				signatureAlgorithm: {
					names: {
						blockName: "signatureAlgorithm"
					}
				},
				signatureValue: "signatureValue"
			}
		}));

		if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for AttributeCertificateV2");
		//endregion

		//region Get internal properties from parsed schema
		this.acinfo = new AttributeCertificateInfoV2({ schema: asn1.result.acinfo });
		this.signatureAlgorithm = new _AlgorithmIdentifier2.default({ schema: asn1.result.signatureAlgorithm });
		this.signatureValue = asn1.result.signatureValue;
		//endregion
	}
	//**********************************************************************************
	/**
  * Convert current object to asn1js object and set correct values
  * @returns {Object} asn1js object
  */
	toSchema() {
		return new asn1js.Sequence({
			value: [this.acinfo.toSchema(), this.signatureAlgorithm.toSchema(), this.signatureValue]
		});
	}
	//**********************************************************************************
	/**
  * Convertion for the class to JSON object
  * @returns {Object}
  */
	toJSON() {
		return {
			acinfo: this.acinfo.toJSON(),
			signatureAlgorithm: this.signatureAlgorithm.toJSON(),
			signatureValue: this.signatureValue.toJSON()
		};
	}
	//**********************************************************************************
}
exports.default = AttributeCertificateV2; //**************************************************************************************
//# sourceMappingURL=AttributeCertificateV2.js.map