"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _asn1js = require("asn1js");

var asn1js = _interopRequireWildcard(_asn1js);

var _pvutils = require("pvutils");

var _CertificateSet = require("./CertificateSet.js");

var _CertificateSet2 = _interopRequireDefault(_CertificateSet);

var _RevocationInfoChoices = require("./RevocationInfoChoices.js");

var _RevocationInfoChoices2 = _interopRequireDefault(_RevocationInfoChoices);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//**************************************************************************************
/**
 * Class from RFC5652
 */
class OriginatorInfo {
	//**********************************************************************************
	/**
  * Constructor for OriginatorInfo class
  * @param {Object} [parameters={}]
  * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
  */
	constructor(parameters = {}) {
		//region Internal properties of the object
		if ("certs" in parameters)
			/**
    * @type {CertificateSet}
    * @desc certs
    */
			this.certs = (0, _pvutils.getParametersValue)(parameters, "certs", OriginatorInfo.defaultValues("certs"));

		if ("crls" in parameters)
			/**
    * @type {RevocationInfoChoices}
    * @desc crls
    */
			this.crls = (0, _pvutils.getParametersValue)(parameters, "crls", OriginatorInfo.defaultValues("crls"));
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
			case "certs":
				return new _CertificateSet2.default();
			case "crls":
				return new _RevocationInfoChoices2.default();
			default:
				throw new Error(`Invalid member name for OriginatorInfo class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
  * Compare values with default values for all class members
  * @param {string} memberName String name for a class member
  * @param {*} memberValue Value to compare with default value
  */
	static compareWithDefault(memberName, memberValue) {
		switch (memberName) {
			case "certs":
				return memberValue.certificates.length === 0;
			case "crls":
				return memberValue.crls.length === 0 && memberValue.otherRevocationInfos.length === 0;
			default:
				throw new Error(`Invalid member name for OriginatorInfo class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
  * Return value of pre-defined ASN.1 schema for current class
  *
  * ASN.1 schema:
  * ```asn1
  * OriginatorInfo ::= SEQUENCE {
  *    certs [0] IMPLICIT CertificateSet OPTIONAL,
  *    crls [1] IMPLICIT RevocationInfoChoices OPTIONAL }
  * ```
  *
  * @param {Object} parameters Input parameters for the schema
  * @returns {Object} asn1js schema object
  */
	static schema(parameters = {}) {
		/**
   * @type {Object}
   * @property {string} [blockName]
   * @property {string} [certs]
   * @property {string} [crls]
   */
		const names = (0, _pvutils.getParametersValue)(parameters, "names", {});

		return new asn1js.Sequence({
			name: names.blockName || "",
			value: [new asn1js.Constructed({
				name: names.certs || "",
				optional: true,
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 0 // [0]
				},
				value: _CertificateSet2.default.schema().valueBlock.value
			}), new asn1js.Constructed({
				name: names.crls || "",
				optional: true,
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 1 // [1]
				},
				value: _RevocationInfoChoices2.default.schema().valueBlock.value
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
		(0, _pvutils.clearProps)(schema, ["certs", "crls"]);
		//endregion

		//region Check the schema is valid
		const asn1 = asn1js.compareSchema(schema, schema, OriginatorInfo.schema({
			names: {
				certs: "certs",
				crls: "crls"
			}
		}));

		if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for OriginatorInfo");
		//endregion

		//region Get internal properties from parsed schema
		if ("certs" in asn1.result) {
			this.certs = new _CertificateSet2.default({
				schema: new asn1js.Set({
					value: asn1.result.certs.valueBlock.value
				})
			});
		}

		if ("crls" in asn1.result) {
			this.crls = new _RevocationInfoChoices2.default({
				schema: new asn1js.Set({
					value: asn1.result.crls.valueBlock.value
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
		const sequenceValue = [];

		if ("certs" in this) {
			sequenceValue.push(new asn1js.Constructed({
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 0 // [0]
				},
				value: this.certs.toSchema().valueBlock.value
			}));
		}

		if ("crls" in this) {
			sequenceValue.push(new asn1js.Constructed({
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 1 // [1]
				},
				value: this.crls.toSchema().valueBlock.value
			}));
		}

		//region Construct and return new ASN.1 schema for this object
		return new asn1js.Sequence({
			value: sequenceValue
		});
		//endregion
	}
	//**********************************************************************************
	/**
  * Convertion for the class to JSON object
  * @returns {Object}
  */
	toJSON() {
		const object = {};

		if ("certs" in this) object.certs = this.certs.toJSON();

		if ("crls" in this) object.crls = this.crls.toJSON();

		return object;
	}
	//**********************************************************************************
}
exports.default = OriginatorInfo; //**************************************************************************************
//# sourceMappingURL=OriginatorInfo.js.map