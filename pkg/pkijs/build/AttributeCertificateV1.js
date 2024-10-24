"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.AttributeCertificateInfoV1 = exports.IssuerSerial = exports.AttCertValidityPeriod = undefined;

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//**************************************************************************************
/**
 * Class from RFC5755
 */
class AttCertValidityPeriod {
	//**********************************************************************************
	/**
  * Constructor for AttCertValidityPeriod class
  * @param {Object} [parameters={}]
  * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
  */
	constructor(parameters = {}) {
		//region Internal properties of the object
		/**
   * @type {GeneralizedTime}
   * @desc notBeforeTime
   */
		this.notBeforeTime = (0, _pvutils.getParametersValue)(parameters, "notBeforeTime", AttCertValidityPeriod.defaultValues("notBeforeTime"));
		/**
   * @type {GeneralizedTime}
   * @desc notAfterTime
   */
		this.notAfterTime = (0, _pvutils.getParametersValue)(parameters, "notAfterTime", AttCertValidityPeriod.defaultValues("notAfterTime"));
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
			case "notBeforeTime":
			case "notAfterTime":
				return new Date(0, 0, 0);
			default:
				throw new Error(`Invalid member name for AttCertValidityPeriod class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
  * Return value of pre-defined ASN.1 schema for current class
  *
  * ASN.1 schema:
  * ```asn1
  * AttCertValidityPeriod  ::= SEQUENCE {
  *   notBeforeTime  GeneralizedTime,
  *   notAfterTime   GeneralizedTime
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
   * @property {string} [notBeforeTime]
   * @property {string} [notAfterTime]
   */
		const names = (0, _pvutils.getParametersValue)(parameters, "names", {});

		return new asn1js.Sequence({
			name: names.blockName || "",
			value: [new asn1js.GeneralizedTime({ name: names.notBeforeTime || "" }), new asn1js.GeneralizedTime({ name: names.notAfterTime || "" })]
		});
	}
	//**********************************************************************************
	/**
  * Convert parsed asn1js object into current class
  * @param {!Object} schema
  */
	fromSchema(schema) {
		//region Clear input data first
		(0, _pvutils.clearProps)(schema, ["notBeforeTime", "notAfterTime"]);
		//endregion

		//region Check the schema is valid
		const asn1 = asn1js.compareSchema(schema, schema, AttCertValidityPeriod.schema({
			names: {
				notBeforeTime: "notBeforeTime",
				notAfterTime: "notAfterTime"
			}
		}));

		if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for AttCertValidityPeriod");
		//endregion

		//region Get internal properties from parsed schema
		this.notBeforeTime = asn1.result.notBeforeTime.toDate();
		this.notAfterTime = asn1.result.notAfterTime.toDate();
		//endregion
	}
	//**********************************************************************************
	/**
  * Convert current object to asn1js object and set correct values
  * @returns {Object} asn1js object
  */
	toSchema() {
		//region Construct and return new ASN.1 schema for this object
		return new asn1js.Sequence({
			value: [new asn1js.GeneralizedTime({ valueDate: this.notBeforeTime }), new asn1js.GeneralizedTime({ valueDate: this.notAfterTime })]
		});
		//endregion
	}
	//**********************************************************************************
	/**
  * Convertion for the class to JSON object
  * @returns {Object}
  */
	toJSON() {
		return {
			notBeforeTime: this.notBeforeTime,
			notAfterTime: this.notAfterTime
		};
	}
	//**********************************************************************************
}
exports.AttCertValidityPeriod = AttCertValidityPeriod; //**************************************************************************************
/**
 * Class from RFC5755
 */

class IssuerSerial {
	//**********************************************************************************
	/**
  * Constructor for IssuerSerial class
  * @param {Object} [parameters={}]
  * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
  */
	constructor(parameters = {}) {
		//region Internal properties of the object
		/**
   * @type {RelativeDistinguishedNames}
   * @desc issuer
   */
		this.issuer = (0, _pvutils.getParametersValue)(parameters, "issuer", IssuerSerial.defaultValues("issuer"));
		/**
   * @type {Integer}
   * @desc serialNumber
   */
		this.serialNumber = (0, _pvutils.getParametersValue)(parameters, "serialNumber", IssuerSerial.defaultValues("serialNumber"));

		if ("issuerUID" in parameters)
			/**
    * @type {BitString}
    * @desc issuerUID
    */
			this.issuerUID = (0, _pvutils.getParametersValue)(parameters, "issuerUID", IssuerSerial.defaultValues("issuerUID"));
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
			case "issuer":
				return new _GeneralNames2.default();
			case "serialNumber":
				return new asn1js.Integer();
			case "issuerUID":
				return new asn1js.BitString();
			default:
				throw new Error(`Invalid member name for IssuerSerial class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
  * Return value of pre-defined ASN.1 schema for current class
  *
  * ASN.1 schema:
  * ```asn1
  * IssuerSerial  ::=  SEQUENCE {
  *   	issuer         GeneralNames,
  * 		serial         CertificateSerialNumber,
  * 		issuerUID      UniqueIdentifier OPTIONAL
  * }
  *
  * CertificateSerialNumber ::= INTEGER
  * UniqueIdentifier  ::=  BIT STRING
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
   * @property {string} [issuerUID]
   */
		const names = (0, _pvutils.getParametersValue)(parameters, "names", {});

		return new asn1js.Sequence({
			name: names.blockName || "",
			value: [_GeneralNames2.default.schema(names.issuer || {}), new asn1js.Integer({ name: names.serialNumber || "" }), new asn1js.BitString({
				optional: true,
				name: names.issuerUID || ""
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
		(0, _pvutils.clearProps)(schema, ["issuer", "serialNumber", "issuerUID"]);
		//endregion

		//region Check the schema is valid
		const asn1 = asn1js.compareSchema(schema, schema, IssuerSerial.schema({
			names: {
				issuer: {
					names: {
						blockName: "issuer"
					}
				},
				serialNumber: "serialNumber",
				issuerUID: "issuerUID"
			}
		}));

		if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for IssuerSerial");
		//endregion

		//region Get internal properties from parsed schema
		this.issuer = new _GeneralNames2.default({ schema: asn1.result.issuer });
		this.serialNumber = asn1.result.serialNumber;

		if ("issuerUID" in asn1.result) this.issuerUID = asn1.result.issuerUID;
		//endregion
	}
	//**********************************************************************************
	/**
  * Convert current object to asn1js object and set correct values
  * @returns {Object} asn1js object
  */
	toSchema() {
		const result = new asn1js.Sequence({
			value: [this.issuer.toSchema(), this.serialNumber]
		});

		if ("issuerUID" in this) result.valueBlock.value.push(this.issuerUID);

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
		const result = {
			issuer: this.issuer.toJSON(),
			serialNumber: this.serialNumber.toJSON()
		};

		if ("issuerUID" in this) result.issuerUID = this.issuerUID.toJSON();

		return result;
	}
	//**********************************************************************************
}
exports.IssuerSerial = IssuerSerial; //**************************************************************************************
/**
 * Class from RFC5755
 */

class AttributeCertificateInfoV1 {
	//**********************************************************************************
	/**
  * Constructor for AttributeCertificateInfoV1 class
  * @param {Object} [parameters={}]
  * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
  */
	constructor(parameters = {}) {
		//region Internal properties of the object
		/**
   * @type {Number}
   * @desc version
   */
		this.version = (0, _pvutils.getParametersValue)(parameters, "version", AttributeCertificateInfoV1.defaultValues("version"));

		if ("baseCertificateID" in parameters)
			/**
    * @type {IssuerSerial}
    * @desc baseCertificateID
    */
			this.baseCertificateID = (0, _pvutils.getParametersValue)(parameters, "baseCertificateID", AttributeCertificateInfoV1.defaultValues("baseCertificateID"));

		if ("subjectName" in parameters)
			/**
    * @type {GeneralNames}
    * @desc subjectName
    */
			this.subjectName = (0, _pvutils.getParametersValue)(parameters, "subjectName", AttributeCertificateInfoV1.defaultValues("subjectName"));

		/**
   * @type {GeneralNames}
   * @desc issuer
   */
		this.issuer = (0, _pvutils.getParametersValue)(parameters, "issuer", AttributeCertificateInfoV1.defaultValues("issuer"));
		/**
   * @type {AlgorithmIdentifier}
   * @desc signature
   */
		this.signature = (0, _pvutils.getParametersValue)(parameters, "signature", AttributeCertificateInfoV1.defaultValues("signature"));
		/**
   * @type {Integer}
   * @desc serialNumber
   */
		this.serialNumber = (0, _pvutils.getParametersValue)(parameters, "serialNumber", AttributeCertificateInfoV1.defaultValues("serialNumber"));
		/**
   * @type {AttCertValidityPeriod}
   * @desc attrCertValidityPeriod
   */
		this.attrCertValidityPeriod = (0, _pvutils.getParametersValue)(parameters, "attrCertValidityPeriod", AttributeCertificateInfoV1.defaultValues("attrCertValidityPeriod"));
		/**
   * @type {Array.<Attribute>}
   * @desc attributes
   */
		this.attributes = (0, _pvutils.getParametersValue)(parameters, "attributes", AttributeCertificateInfoV1.defaultValues("attributes"));

		if ("issuerUniqueID" in parameters)
			/**
    * @type {BitString}
    * @desc issuerUniqueID
    */
			this.issuerUniqueID = (0, _pvutils.getParametersValue)(parameters, "issuerUniqueID", AttributeCertificateInfoV1.defaultValues("issuerUniqueID"));

		if ("extensions" in parameters)
			/**
    * @type {Extensions}
    * @desc extensions
    */
			this.extensions = (0, _pvutils.getParametersValue)(parameters, "extensions", AttributeCertificateInfoV1.defaultValues("extensions"));
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
				return 0;
			case "baseCertificateID":
				return new IssuerSerial();
			case "subjectName":
				return new _GeneralNames2.default();
			case "issuer":
				return {};
			case "signature":
				return new _AlgorithmIdentifier2.default();
			case "serialNumber":
				return new asn1js.Integer();
			case "attrCertValidityPeriod":
				return new AttCertValidityPeriod();
			case "attributes":
				return [];
			case "issuerUniqueID":
				return new asn1js.BitString();
			case "extensions":
				return new _Extensions2.default();
			default:
				throw new Error(`Invalid member name for AttributeCertificateInfoV1 class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
  * Return value of pre-defined ASN.1 schema for current class
  *
  * ASN.1 schema:
  * ```asn1
  * AttributeCertificateInfo ::= SEQUENCE {
  * 	version Version DEFAULT v1,
  * 	subject CHOICE {
  * 		baseCertificateID [0] IssuerSerial, -- associated with a Public Key Certificate
  * 		subjectName [1] GeneralNames }, -- associated with a name
  * 	issuer GeneralNames, -- CA issuing the attribute certificate
  * 	signature AlgorithmIdentifier,
  * 	serialNumber CertificateSerialNumber,
  * 	attrCertValidityPeriod AttCertValidityPeriod,
  * 	attributes SEQUENCE OF Attribute,
  * 	issuerUniqueID UniqueIdentifier OPTIONAL,
  * 	extensions Extensions OPTIONAL
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
			value: [new asn1js.Integer({ name: names.version || "" }), new asn1js.Choice({
				value: [new asn1js.Constructed({
					name: names.baseCertificateID || "",
					idBlock: {
						tagClass: 3,
						tagNumber: 0 // [0]
					},
					value: IssuerSerial.schema().valueBlock.value
				}), new asn1js.Constructed({
					name: names.subjectName || "",
					idBlock: {
						tagClass: 3,
						tagNumber: 1 // [2]
					},
					value: _GeneralNames2.default.schema().valueBlock.value
				})]
			}), _GeneralNames2.default.schema({
				names: {
					blockName: names.issuer || ""
				}
			}), _AlgorithmIdentifier2.default.schema(names.signature || {}), new asn1js.Integer({ name: names.serialNumber || "" }), AttCertValidityPeriod.schema(names.attrCertValidityPeriod || {}), new asn1js.Sequence({
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
		(0, _pvutils.clearProps)(schema, ["version", "baseCertificateID", "subjectName", "issuer", "signature", "serialNumber", "attrCertValidityPeriod", "attributes", "issuerUniqueID", "extensions"]);
		//endregion

		//region Check the schema is valid
		const asn1 = asn1js.compareSchema(schema, schema, AttributeCertificateInfoV1.schema({
			names: {
				version: "version",
				baseCertificateID: "baseCertificateID",
				subjectName: "subjectName",
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

		if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for AttributeCertificateInfoV1");
		//endregion

		//region Get internal properties from parsed schema
		this.version = asn1.result.version.valueBlock.valueDec;

		if ("baseCertificateID" in asn1.result) {
			this.baseCertificateID = new IssuerSerial({
				schema: new asn1js.Sequence({
					value: asn1.result.baseCertificateID.valueBlock.value
				})
			});
		}

		if ("subjectName" in asn1.result) {
			this.subjectName = new _GeneralNames2.default({
				schema: new asn1js.Sequence({
					value: asn1.result.subjectName.valueBlock.value
				})
			});
		}

		this.issuer = asn1.result.issuer;
		this.signature = new _AlgorithmIdentifier2.default({ schema: asn1.result.signature });
		this.serialNumber = asn1.result.serialNumber;
		this.attrCertValidityPeriod = new AttCertValidityPeriod({ schema: asn1.result.attrCertValidityPeriod });
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
			value: [new asn1js.Integer({ value: this.version })]
		});

		if ("baseCertificateID" in this) {
			result.valueBlock.value.push(new asn1js.Constructed({
				idBlock: {
					tagClass: 3,
					tagNumber: 0 // [0]
				},
				value: this.baseCertificateID.toSchema().valueBlock.value
			}));
		}

		if ("subjectName" in this) {
			result.valueBlock.value.push(new asn1js.Constructed({
				idBlock: {
					tagClass: 3,
					tagNumber: 1 // [1]
				},
				value: this.subjectName.toSchema().valueBlock.value
			}));
		}

		result.valueBlock.value.push(this.issuer.toSchema());
		result.valueBlock.value.push(this.signature.toSchema());
		result.valueBlock.value.push(this.serialNumber);
		result.valueBlock.value.push(this.attrCertValidityPeriod.toSchema());
		result.valueBlock.value.push(new asn1js.Sequence({
			value: Array.from(this.attributes, element => element.toSchema())
		}));

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
			version: this.version
		};

		if ("baseCertificateID" in this) result.baseCertificateID = this.baseCertificateID.toJSON();

		if ("subjectName" in this) result.subjectName = this.subjectName.toJSON();

		result.issuer = this.issuer.toJSON();
		result.signature = this.signature.toJSON();
		result.serialNumber = this.serialNumber.toJSON();
		result.attrCertValidityPeriod = this.attrCertValidityPeriod.toJSON();
		result.attributes = Array.from(this.attributes, element => element.toJSON());

		if ("issuerUniqueID" in this) result.issuerUniqueID = this.issuerUniqueID.toJSON();

		if ("extensions" in this) result.extensions = this.extensions.toJSON();

		return result;
	}
	//**********************************************************************************
}
exports.AttributeCertificateInfoV1 = AttributeCertificateInfoV1; //**************************************************************************************
/**
 * Class from X.509:1997
 */

class AttributeCertificateV1 {
	//**********************************************************************************
	/**
  * Constructor for AttributeCertificateV1 class
  * @param {Object} [parameters={}]
  * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
  */
	constructor(parameters = {}) {
		//region Internal properties of the object
		/**
   * @type {AttributeCertificateInfoV1}
   * @desc acinfo
   */
		this.acinfo = (0, _pvutils.getParametersValue)(parameters, "acinfo", AttributeCertificateV1.defaultValues("acinfo"));
		/**
   * @type {AlgorithmIdentifier}
   * @desc signatureAlgorithm
   */
		this.signatureAlgorithm = (0, _pvutils.getParametersValue)(parameters, "signatureAlgorithm", AttributeCertificateV1.defaultValues("signatureAlgorithm"));
		/**
   * @type {BitString}
   * @desc signatureValue
   */
		this.signatureValue = (0, _pvutils.getParametersValue)(parameters, "signatureValue", AttributeCertificateV1.defaultValues("signatureValue"));
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
				return new AttributeCertificateInfoV1();
			case "signatureAlgorithm":
				return new _AlgorithmIdentifier2.default();
			case "signatureValue":
				return new asn1js.BitString();
			default:
				throw new Error(`Invalid member name for AttributeCertificateV1 class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
  * Return value of pre-defined ASN.1 schema for current class
  *
  * ASN.1 schema:
  * ```asn1
  * AttributeCertificate ::= SEQUENCE {
  *   acinfo               AttributeCertificateInfoV1,
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
			value: [AttributeCertificateInfoV1.schema(names.acinfo || {}), _AlgorithmIdentifier2.default.schema(names.signatureAlgorithm || {}), new asn1js.BitString({ name: names.signatureValue || "" })]
		});
	}
	//**********************************************************************************
	/**
  * Convert parsed asn1js object into current class
  * @param {!Object} schema
  */
	fromSchema(schema) {
		//region Clear input data first
		(0, _pvutils.clearProps)(schema, ["acinfo", "signatureValue", "signatureAlgorithm"]);
		//endregion

		//region Check the schema is valid
		const asn1 = asn1js.compareSchema(schema, schema, AttributeCertificateV1.schema({
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

		if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for AttributeCertificateV1");
		//endregion

		//region Get internal properties from parsed schema
		this.acinfo = new AttributeCertificateInfoV1({ schema: asn1.result.acinfo });
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
exports.default = AttributeCertificateV1; //**************************************************************************************
//# sourceMappingURL=AttributeCertificateV1.js.map