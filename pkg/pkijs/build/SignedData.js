"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _asn1js = require("asn1js");

var asn1js = _interopRequireWildcard(_asn1js);

var _pvutils = require("pvutils");

var _common = require("./common.js");

var _AlgorithmIdentifier = require("./AlgorithmIdentifier.js");

var _AlgorithmIdentifier2 = _interopRequireDefault(_AlgorithmIdentifier);

var _EncapsulatedContentInfo = require("./EncapsulatedContentInfo.js");

var _EncapsulatedContentInfo2 = _interopRequireDefault(_EncapsulatedContentInfo);

var _Certificate = require("./Certificate.js");

var _Certificate2 = _interopRequireDefault(_Certificate);

var _CertificateRevocationList = require("./CertificateRevocationList.js");

var _CertificateRevocationList2 = _interopRequireDefault(_CertificateRevocationList);

var _OtherRevocationInfoFormat = require("./OtherRevocationInfoFormat.js");

var _OtherRevocationInfoFormat2 = _interopRequireDefault(_OtherRevocationInfoFormat);

var _SignerInfo = require("./SignerInfo.js");

var _SignerInfo2 = _interopRequireDefault(_SignerInfo);

var _CertificateSet = require("./CertificateSet.js");

var _CertificateSet2 = _interopRequireDefault(_CertificateSet);

var _RevocationInfoChoices = require("./RevocationInfoChoices.js");

var _RevocationInfoChoices2 = _interopRequireDefault(_RevocationInfoChoices);

var _IssuerAndSerialNumber = require("./IssuerAndSerialNumber.js");

var _IssuerAndSerialNumber2 = _interopRequireDefault(_IssuerAndSerialNumber);

var _TSTInfo = require("./TSTInfo.js");

var _TSTInfo2 = _interopRequireDefault(_TSTInfo);

var _CertificateChainValidationEngine = require("./CertificateChainValidationEngine.js");

var _CertificateChainValidationEngine2 = _interopRequireDefault(_CertificateChainValidationEngine);

var _BasicOCSPResponse = require("./BasicOCSPResponse.js");

var _BasicOCSPResponse2 = _interopRequireDefault(_BasicOCSPResponse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//**************************************************************************************
/**
 * Class from RFC5652
 */
class SignedData {
	//**********************************************************************************
	/**
  * Constructor for SignedData class
  * @param {Object} [parameters={}]
  * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
  */
	constructor(parameters = {}) {
		//region Internal properties of the object
		/**
   * @type {number}
   * @desc version
   */
		this.version = (0, _pvutils.getParametersValue)(parameters, "version", SignedData.defaultValues("version"));
		/**
   * @type {Array.<AlgorithmIdentifier>}
   * @desc digestAlgorithms
   */
		this.digestAlgorithms = (0, _pvutils.getParametersValue)(parameters, "digestAlgorithms", SignedData.defaultValues("digestAlgorithms"));
		/**
   * @type {EncapsulatedContentInfo}
   * @desc encapContentInfo
   */
		this.encapContentInfo = (0, _pvutils.getParametersValue)(parameters, "encapContentInfo", SignedData.defaultValues("encapContentInfo"));

		if ("certificates" in parameters)
			/**
    * @type {Array.<Certificate|OtherCertificateFormat>}
    * @desc certificates
    */
			this.certificates = (0, _pvutils.getParametersValue)(parameters, "certificates", SignedData.defaultValues("certificates"));

		if ("crls" in parameters)
			/**
    * @type {Array.<CertificateRevocationList|OtherRevocationInfoFormat>}
    * @desc crls
    */
			this.crls = (0, _pvutils.getParametersValue)(parameters, "crls", SignedData.defaultValues("crls"));

		if ("ocsps" in parameters)
			/**
    * @type {Array.<BasicOCSPResponse>}
    * @desc crls
    */
			this.ocsps = (0, _pvutils.getParametersValue)(parameters, "ocsps", SignedData.defaultValues("ocsps"));

		/**
   * @type {Array.<SignerInfo>}
   * @desc signerInfos
   */
		this.signerInfos = (0, _pvutils.getParametersValue)(parameters, "signerInfos", SignedData.defaultValues("signerInfos"));
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
			case "digestAlgorithms":
				return [];
			case "encapContentInfo":
				return new _EncapsulatedContentInfo2.default();
			case "certificates":
				return [];
			case "crls":
				return [];
			case "ocsps":
				return [];
			case "signerInfos":
				return [];
			default:
				throw new Error(`Invalid member name for SignedData class: ${memberName}`);
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
			case "version":
				return memberValue === SignedData.defaultValues("version");
			case "encapContentInfo":
				return new _EncapsulatedContentInfo2.default();
			case "digestAlgorithms":
			case "certificates":
			case "crls":
			case "ocsps":
			case "signerInfos":
				return memberValue.length === 0;
			default:
				throw new Error(`Invalid member name for SignedData class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
  * Return value of pre-defined ASN.1 schema for current class
  *
  * ASN.1 schema:
  * ```asn1
  * SignedData ::= SEQUENCE {
  *    version CMSVersion,
  *    digestAlgorithms DigestAlgorithmIdentifiers,
  *    encapContentInfo EncapsulatedContentInfo,
  *    certificates [0] IMPLICIT CertificateSet OPTIONAL,
  *    crls [1] IMPLICIT RevocationInfoChoices OPTIONAL,
  *    signerInfos SignerInfos }
  * ```
  *
  * @param {Object} parameters Input parameters for the schema
  * @returns {Object} asn1js schema object
  */
	static schema(parameters = {}) {
		/**
   * @type {Object}
   * @property {string} [blockName]
   * @property {string} [optional]
   * @property {string} [digestAlgorithms]
   * @property {string} [encapContentInfo]
   * @property {string} [certificates]
   * @property {string} [crls]
   * @property {string} [signerInfos]
   */
		const names = (0, _pvutils.getParametersValue)(parameters, "names", {});

		if ("optional" in names === false) names.optional = false;

		return new asn1js.Sequence({
			name: names.blockName || "SignedData",
			optional: names.optional,
			value: [new asn1js.Integer({ name: names.version || "SignedData.version" }), new asn1js.Set({
				value: [new asn1js.Repeated({
					name: names.digestAlgorithms || "SignedData.digestAlgorithms",
					value: _AlgorithmIdentifier2.default.schema()
				})]
			}), _EncapsulatedContentInfo2.default.schema(names.encapContentInfo || {
				names: {
					blockName: "SignedData.encapContentInfo"
				}
			}), new asn1js.Constructed({
				name: names.certificates || "SignedData.certificates",
				optional: true,
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 0 // [0]
				},
				value: _CertificateSet2.default.schema().valueBlock.value
			}), // IMPLICIT CertificateSet
			new asn1js.Constructed({
				optional: true,
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 1 // [1]
				},
				value: _RevocationInfoChoices2.default.schema(names.crls || {
					names: {
						crls: "SignedData.crls"
					}
				}).valueBlock.value
			}), // IMPLICIT RevocationInfoChoices
			new asn1js.Set({
				value: [new asn1js.Repeated({
					name: names.signerInfos || "SignedData.signerInfos",
					value: _SignerInfo2.default.schema()
				})]
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
		(0, _pvutils.clearProps)(schema, ["SignedData.version", "SignedData.digestAlgorithms", "SignedData.encapContentInfo", "SignedData.certificates", "SignedData.crls", "SignedData.signerInfos"]);
		//endregion

		//region Check the schema is valid
		const asn1 = asn1js.compareSchema(schema, schema, SignedData.schema());

		if (asn1.verified === false) throw new Error("Object's schema was not verified against input data for SignedData");
		//endregion

		//region Get internal properties from parsed schema
		this.version = asn1.result["SignedData.version"].valueBlock.valueDec;

		if ("SignedData.digestAlgorithms" in asn1.result) // Could be empty SET of digest algorithms
			this.digestAlgorithms = Array.from(asn1.result["SignedData.digestAlgorithms"], algorithm => new _AlgorithmIdentifier2.default({ schema: algorithm }));

		this.encapContentInfo = new _EncapsulatedContentInfo2.default({ schema: asn1.result["SignedData.encapContentInfo"] });

		if ("SignedData.certificates" in asn1.result) {
			const certificateSet = new _CertificateSet2.default({
				schema: new asn1js.Set({
					value: asn1.result["SignedData.certificates"].valueBlock.value
				})
			});
			this.certificates = certificateSet.certificates.slice(0); // Copy all just for making comfortable access
		}

		if ("SignedData.crls" in asn1.result) {
			this.crls = Array.from(asn1.result["SignedData.crls"], crl => {
				if (crl.idBlock.tagClass === 1) return new _CertificateRevocationList2.default({ schema: crl });

				//region Create SEQUENCE from [1]
				crl.idBlock.tagClass = 1; // UNIVERSAL
				crl.idBlock.tagNumber = 16; // SEQUENCE
				//endregion

				return new _OtherRevocationInfoFormat2.default({ schema: crl });
			});
		}

		if ("SignedData.signerInfos" in asn1.result) // Could be empty SET SignerInfos
			this.signerInfos = Array.from(asn1.result["SignedData.signerInfos"], signerInfoSchema => new _SignerInfo2.default({ schema: signerInfoSchema }));
		//endregion
	}
	//**********************************************************************************
	/**
  * Convert current object to asn1js object and set correct values
  * @returns {Object} asn1js object
  */
	toSchema(encodeFlag = false) {
		//region Create array for output sequence
		const outputArray = [];

		outputArray.push(new asn1js.Integer({ value: this.version }));

		//region Create array of digest algorithms
		outputArray.push(new asn1js.Set({
			value: Array.from(this.digestAlgorithms, algorithm => algorithm.toSchema(encodeFlag))
		}));
		//endregion

		outputArray.push(this.encapContentInfo.toSchema());

		if ("certificates" in this) {
			const certificateSet = new _CertificateSet2.default({ certificates: this.certificates });
			const certificateSetSchema = certificateSet.toSchema();

			outputArray.push(new asn1js.Constructed({
				idBlock: {
					tagClass: 3,
					tagNumber: 0
				},
				value: certificateSetSchema.valueBlock.value
			}));
		}

		if ("crls" in this) {
			outputArray.push(new asn1js.Constructed({
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 1 // [1]
				},
				value: Array.from(this.crls, crl => {
					if (crl instanceof _OtherRevocationInfoFormat2.default) {
						const crlSchema = crl.toSchema(encodeFlag);

						crlSchema.idBlock.tagClass = 3;
						crlSchema.idBlock.tagNumber = 1;

						return crlSchema;
					}

					return crl.toSchema(encodeFlag);
				})
			}));
		}

		//region Create array of signer infos
		outputArray.push(new asn1js.Set({
			value: Array.from(this.signerInfos, signerInfo => signerInfo.toSchema(encodeFlag))
		}));
		//endregion
		//endregion

		//region Construct and return new ASN.1 schema for this object
		return new asn1js.Sequence({
			value: outputArray
		});
		//endregion
	}
	//**********************************************************************************
	/**
  * Convertion for the class to JSON object
  * @returns {Object}
  */
	toJSON() {
		const _object = {
			version: this.version,
			digestAlgorithms: Array.from(this.digestAlgorithms, algorithm => algorithm.toJSON()),
			encapContentInfo: this.encapContentInfo.toJSON()
		};

		if ("certificates" in this) _object.certificates = Array.from(this.certificates, certificate => certificate.toJSON());

		if ("crls" in this) _object.crls = Array.from(this.crls, crl => crl.toJSON());

		_object.signerInfos = Array.from(this.signerInfos, signerInfo => signerInfo.toJSON());

		return _object;
	}
	//**********************************************************************************
	/**
  * Verify current SignedData value
  * @param {Object} [param={}]
  * @param {Number} [param.signer = -1] Index of the signer which information we need to verify
  * @param {ArrayBuffer} [param.data=new ArrayBuffer(0)]
  * @param {Array.<Certificate>} [param.trustedCerts=[]]
  * @param {Date} [param.checkDate=new Date()]
  * @param {Boolean} [param.checkChain=false]
  * @param {Boolean} [param.extendedMode=false]
  * @param {?Function} [findOrigin=null]
  * @param {?Function} [findIssuer=null]
  */
	verify({
		signer = -1,
		data = new ArrayBuffer(0),
		trustedCerts = [],
		checkDate = new Date(),
		checkChain = false,
		extendedMode = false,
		passedWhenNotRevValues = false,
		findOrigin = null,
		findIssuer = null
	} = {}) {
		//region Global variables
		let sequence = Promise.resolve();

		let messageDigestValue = new ArrayBuffer(0);

		let shaAlgorithm = "";

		let signerCertificate = {};

		let timestampSerial = null;

		let certificatePath = [];

		const engine = (0, _common.getEngine)();
		//endregion

		//region Get a "crypto" extension
		const crypto = (0, _common.getCrypto)();
		if (typeof crypto === "undefined") return Promise.reject("Unable to create WebCrypto object");
		//endregion

		//region Get a signer number
		if (signer === -1) {
			if (extendedMode) {
				return Promise.reject({
					date: checkDate,
					code: 1,
					message: "Unable to get signer index from input parameters",
					signatureVerified: null,
					signerCertificate: null,
					signerCertificateVerified: null
				});
			}

			return Promise.reject("Unable to get signer index from input parameters");
		}
		//endregion

		//region Check that certificates field was included in signed data
		if ("certificates" in this === false) {
			if (extendedMode) {
				return Promise.reject({
					date: checkDate,
					code: 2,
					message: "No certificates attached to this signed data",
					signatureVerified: null,
					signerCertificate: null,
					signerCertificateVerified: null
				});
			}

			return Promise.reject("No certificates attached to this signed data");
		}
		//endregion

		//region Find a certificate for specified signer
		if (this.signerInfos[signer].sid instanceof _IssuerAndSerialNumber2.default) {
			sequence = sequence.then(() => {
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = this.certificates[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						const certificate = _step.value;

						if (certificate instanceof _Certificate2.default === false) continue;

						if (certificate.issuer.isEqual(this.signerInfos[signer].sid.issuer) && certificate.serialNumber.isEqual(this.signerInfos[signer].sid.serialNumber)) {
							signerCertificate = certificate;
							return Promise.resolve();
						}
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}

				if (extendedMode) {
					return Promise.reject({
						date: checkDate,
						code: 3,
						message: "Unable to find signer certificate",
						signatureVerified: null,
						signerCertificate: null,
						signerCertificateVerified: null
					});
				}

				return Promise.reject("Unable to find signer certificate");
			});
		} else // Find by SubjectKeyIdentifier
			{
				sequence = sequence.then(() => Promise.all(Array.from(this.certificates.filter(certificate => certificate instanceof _Certificate2.default), certificate => crypto.digest({ name: "sha-1" }, new Uint8Array(certificate.subjectPublicKeyInfo.subjectPublicKey.valueBlock.valueHex)))).then(results => {
					var _iteratorNormalCompletion2 = true;
					var _didIteratorError2 = false;
					var _iteratorError2 = undefined;

					try {
						for (var _iterator2 = this.certificates.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
							const _ref = _step2.value;

							var _ref2 = _slicedToArray(_ref, 2);

							const index = _ref2[0];
							const certificate = _ref2[1];

							if (certificate instanceof _Certificate2.default === false) continue;

							if ((0, _pvutils.isEqualBuffer)(results[index], this.signerInfos[signer].sid.valueBlock.valueHex)) {
								signerCertificate = certificate;
								return Promise.resolve();
							}
						}
					} catch (err) {
						_didIteratorError2 = true;
						_iteratorError2 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion2 && _iterator2.return) {
								_iterator2.return();
							}
						} finally {
							if (_didIteratorError2) {
								throw _iteratorError2;
							}
						}
					}

					if (extendedMode) {
						return Promise.reject({
							date: checkDate,
							code: 3,
							message: "Unable to find signer certificate",
							signatureVerified: null,
							signerCertificate: null,
							signerCertificateVerified: null
						});
					}

					return Promise.reject("Unable to find signer certificate");
				}, () => {
					if (extendedMode) {
						return Promise.reject({
							date: checkDate,
							code: 3,
							message: "Unable to find signer certificate",
							signatureVerified: null,
							signerCertificate: null,
							signerCertificateVerified: null
						});
					}

					return Promise.reject("Unable to find signer certificate");
				}));
			}
		//endregion

		//region Verify internal digest in case of "tSTInfo" content type
		sequence = sequence.then(() => {
			if (this.encapContentInfo.eContentType === "1.2.840.113549.1.9.16.1.4") {
				//region Check "eContent" precense
				if ("eContent" in this.encapContentInfo === false) return false;
				//endregion

				//region Initialize TST_INFO value
				const asn1 = asn1js.fromBER(this.encapContentInfo.eContent.valueBlock.valueHex);
				let tstInfo;

				try {
					tstInfo = new _TSTInfo2.default({ schema: asn1.result });
				} catch (ex) {
					return false;
				}
				//endregion

				//region Change "checkDate" and append "timestampSerial"
				checkDate = tstInfo.genTime;
				timestampSerial = tstInfo.serialNumber.valueBlock.valueHex;
				//endregion

				//region Check that we do have detached data content
				if (data.byteLength === 0) {
					if (extendedMode) {
						return Promise.reject({
							date: checkDate,
							code: 4,
							message: "Missed detached data input array",
							signatureVerified: null,
							signerCertificate,
							signerCertificateVerified: null
						});
					}

					return Promise.reject("Missed detached data input array");
				}
				//endregion

				return tstInfo.verify({ data });
			}

			return true;
		});
		//endregion

		//region Make additional verification for signer's certificate
		function checkCA(cert) {
			/// <param name="cert" type="in_window.org.pkijs.simpl.CERT">Certificate to find CA flag for</param>

			//region Do not include signer's certificate
			if (cert.issuer.isEqual(signerCertificate.issuer) === true && cert.serialNumber.isEqual(signerCertificate.serialNumber) === true) return null;
			//endregion

			let isCA = false;

			if ("extensions" in cert) {
				var _iteratorNormalCompletion3 = true;
				var _didIteratorError3 = false;
				var _iteratorError3 = undefined;

				try {
					for (var _iterator3 = cert.extensions[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
						const extension = _step3.value;

						if (extension.extnID === "2.5.29.19") // BasicConstraints
							{
								if ("cA" in extension.parsedValue) {
									if (extension.parsedValue.cA === true) isCA = true;
								}
							}
					}
				} catch (err) {
					_didIteratorError3 = true;
					_iteratorError3 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion3 && _iterator3.return) {
							_iterator3.return();
						}
					} finally {
						if (_didIteratorError3) {
							throw _iteratorError3;
						}
					}
				}
			}

			if (isCA) return cert;

			return null;
		}

		if (checkChain) {
			sequence = sequence.then(result => {
				//region Verify result of previous operation
				if (result === false) return false;
				//endregion

				const promiseResults = Array.from(this.certificates.filter(certificate => certificate instanceof _Certificate2.default), certificate => checkCA(certificate));

				const certificateChainValidationEngineParameters = {
					checkDate,
					certs: Array.from(promiseResults.filter(_result => _result !== null)),
					trustedCerts
				};

				if (findIssuer !== null) certificateChainValidationEngineParameters.findIssuer = findIssuer;

				if (findOrigin !== null) certificateChainValidationEngineParameters.findOrigin = findOrigin;

				const certificateChainEngine = new _CertificateChainValidationEngine2.default(certificateChainValidationEngineParameters);

				certificateChainEngine.certs.push(signerCertificate);

				if ("crls" in this) {
					var _iteratorNormalCompletion4 = true;
					var _didIteratorError4 = false;
					var _iteratorError4 = undefined;

					try {
						for (var _iterator4 = this.crls[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
							const crl = _step4.value;

							if ("thisUpdate" in crl) certificateChainEngine.crls.push(crl);else // Assumed "revocation value" has "OtherRevocationInfoFormat"
								{
									if (crl.otherRevInfoFormat === "1.3.6.1.5.5.7.48.1.1") // Basic OCSP response
										certificateChainEngine.ocsps.push(new _BasicOCSPResponse2.default({ schema: crl.otherRevInfo }));
								}
						}
					} catch (err) {
						_didIteratorError4 = true;
						_iteratorError4 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion4 && _iterator4.return) {
								_iterator4.return();
							}
						} finally {
							if (_didIteratorError4) {
								throw _iteratorError4;
							}
						}
					}
				}

				if ("ocsps" in this) certificateChainEngine.ocsps.push(...this.ocsps);

				return certificateChainEngine.verify({ passedWhenNotRevValues }).then(verificationResult => {
					if ("certificatePath" in verificationResult) certificatePath = verificationResult.certificatePath;

					if (verificationResult.result === true) return Promise.resolve(true);

					if (extendedMode) {
						return Promise.reject({
							date: checkDate,
							code: 5,
							message: `Validation of signer's certificate failed: ${verificationResult.resultMessage}`,
							signatureVerified: null,
							signerCertificate,
							signerCertificateVerified: false
						});
					}

					return Promise.reject("Validation of signer's certificate failed");
				}, error => {
					if (extendedMode) {
						return Promise.reject({
							date: checkDate,
							code: 5,
							message: `Validation of signer's certificate failed with error: ${error instanceof Object ? error.resultMessage : error}`,
							signatureVerified: null,
							signerCertificate,
							signerCertificateVerified: false
						});
					}

					return Promise.reject(`Validation of signer's certificate failed with error: ${error instanceof Object ? error.resultMessage : error}`);
				});
			});
		}
		//endregion

		//region Find signer's hashing algorithm
		sequence = sequence.then(result => {
			//region Verify result of previous operation
			if (result === false) return false;
			//endregion

			const signerInfoHashAlgorithm = (0, _common.getAlgorithmByOID)(this.signerInfos[signer].digestAlgorithm.algorithmId);
			if ("name" in signerInfoHashAlgorithm === false) {
				if (extendedMode) {
					return Promise.reject({
						date: checkDate,
						code: 7,
						message: `Unsupported signature algorithm: ${this.signerInfos[signer].digestAlgorithm.algorithmId}`,
						signatureVerified: null,
						signerCertificate,
						signerCertificateVerified: true
					});
				}

				return Promise.reject(`Unsupported signature algorithm: ${this.signerInfos[signer].digestAlgorithm.algorithmId}`);
			}

			shaAlgorithm = signerInfoHashAlgorithm.name;

			return true;
		});
		//endregion

		//region Create correct data block for verification
		sequence = sequence.then(result => {
			//region Verify result of previous operation
			if (result === false) return false;
			//endregion

			if ("eContent" in this.encapContentInfo) // Attached data
				{
					if (this.encapContentInfo.eContent.idBlock.tagClass === 1 && this.encapContentInfo.eContent.idBlock.tagNumber === 4) {
						if (this.encapContentInfo.eContent.idBlock.isConstructed === false) data = this.encapContentInfo.eContent.valueBlock.valueHex;else {
							var _iteratorNormalCompletion5 = true;
							var _didIteratorError5 = false;
							var _iteratorError5 = undefined;

							try {
								for (var _iterator5 = this.encapContentInfo.eContent.valueBlock.value[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
									const contentValue = _step5.value;

									data = (0, _pvutils.utilConcatBuf)(data, contentValue.valueBlock.valueHex);
								}
							} catch (err) {
								_didIteratorError5 = true;
								_iteratorError5 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion5 && _iterator5.return) {
										_iterator5.return();
									}
								} finally {
									if (_didIteratorError5) {
										throw _iteratorError5;
									}
								}
							}
						}
					} else data = this.encapContentInfo.eContent.valueBlock.valueBeforeDecode;
				} else // Detached data
				{
					if (data.byteLength === 0) // Check that "data" already provided by function parameter
						{
							if (extendedMode) {
								return Promise.reject({
									date: checkDate,
									code: 8,
									message: "Missed detached data input array",
									signatureVerified: null,
									signerCertificate,
									signerCertificateVerified: true
								});
							}

							return Promise.reject("Missed detached data input array");
						}
				}

			if ("signedAttrs" in this.signerInfos[signer]) {
				//region Check mandatory attributes
				let foundContentType = false;
				let foundMessageDigest = false;

				var _iteratorNormalCompletion6 = true;
				var _didIteratorError6 = false;
				var _iteratorError6 = undefined;

				try {
					for (var _iterator6 = this.signerInfos[signer].signedAttrs.attributes[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
						const attribute = _step6.value;

						//region Check that "content-type" attribute exists
						if (attribute.type === "1.2.840.113549.1.9.3") foundContentType = true;
						//endregion

						//region Check that "message-digest" attribute exists
						if (attribute.type === "1.2.840.113549.1.9.4") {
							foundMessageDigest = true;
							messageDigestValue = attribute.values[0].valueBlock.valueHex;
						}
						//endregion

						//region Speed-up searching
						if (foundContentType && foundMessageDigest) break;
						//endregion
					}
				} catch (err) {
					_didIteratorError6 = true;
					_iteratorError6 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion6 && _iterator6.return) {
							_iterator6.return();
						}
					} finally {
						if (_didIteratorError6) {
							throw _iteratorError6;
						}
					}
				}

				if (foundContentType === false) {
					if (extendedMode) {
						return Promise.reject({
							date: checkDate,
							code: 9,
							message: "Attribute \"content-type\" is a mandatory attribute for \"signed attributes\"",
							signatureVerified: null,
							signerCertificate,
							signerCertificateVerified: true
						});
					}

					return Promise.reject("Attribute \"content-type\" is a mandatory attribute for \"signed attributes\"");
				}

				if (foundMessageDigest === false) {
					if (extendedMode) {
						return Promise.reject({
							date: checkDate,
							code: 10,
							message: "Attribute \"message-digest\" is a mandatory attribute for \"signed attributes\"",
							signatureVerified: null,
							signerCertificate,
							signerCertificateVerified: true
						});
					}

					return Promise.reject("Attribute \"message-digest\" is a mandatory attribute for \"signed attributes\"");
				}
				//endregion
			}

			return true;
		});
		//endregion

		//region Verify "message-digest" attribute in case of "signedAttrs"
		sequence = sequence.then(result => {
			//region Verify result of previous operation
			if (result === false) return false;
			//endregion

			if ("signedAttrs" in this.signerInfos[signer]) return crypto.digest(shaAlgorithm, new Uint8Array(data));

			return true;
		}).then(
		/**
   * @param {ArrayBuffer} result
   */
		result => {
			//region Verify result of previous operation
			if (result === false) return false;
			//endregion

			if ("signedAttrs" in this.signerInfos[signer]) {
				if ((0, _pvutils.isEqualBuffer)(result, messageDigestValue)) {
					data = this.signerInfos[signer].signedAttrs.encodedValue;
					return true;
				}

				return false;
			}

			return true;
		});
		//endregion

		sequence = sequence.then(result => {
			//region Verify result of previous operation
			if (result === false) return false;
			//endregion

			return engine.subtle.verifyWithPublicKey(data, this.signerInfos[signer].signature, signerCertificate.subjectPublicKeyInfo, signerCertificate.signatureAlgorithm, shaAlgorithm);
		});

		//region Make a final result
		sequence = sequence.then(result => {
			if (extendedMode) {
				return {
					date: checkDate,
					code: 14,
					message: "",
					signatureVerified: result,
					signerCertificate,
					timestampSerial,
					signerCertificateVerified: true,
					certificatePath
				};
			}

			return result;
		}, error => {
			if (extendedMode) {
				if ("code" in error) return Promise.reject(error);

				return Promise.reject({
					date: checkDate,
					code: 15,
					message: `Error during verification: ${error.message}`,
					signatureVerified: null,
					signerCertificate,
					timestampSerial,
					signerCertificateVerified: true
				});
			}

			return Promise.reject(error);
		});
		//endregion

		return sequence;
	}
	//**********************************************************************************
	/**
  * Signing current SignedData
  * @param {key} privateKey Private key for "subjectPublicKeyInfo" structure
  * @param {number} signerIndex Index number (starting from 0) of signer index to make signature for
  * @param {string} [hashAlgorithm="SHA-1"] Hashing algorithm. Default SHA-1
  * @param {ArrayBuffer} [data] Detached data
  * @returns {*}
  */
	sign(privateKey, signerIndex, hashAlgorithm = "SHA-1", data = new ArrayBuffer(0)) {
		//region Initial checking
		if (typeof privateKey === "undefined") return Promise.reject("Need to provide a private key for signing");
		//endregion

		//region Initial variables
		let sequence = Promise.resolve();
		let parameters;

		const engine = (0, _common.getEngine)();
		//endregion

		//region Simple check for supported algorithm
		const hashAlgorithmOID = (0, _common.getOIDByAlgorithm)({ name: hashAlgorithm });
		if (hashAlgorithmOID === "") return Promise.reject(`Unsupported hash algorithm: ${hashAlgorithm}`);
		//endregion

		//region Append information about hash algorithm
		if (this.digestAlgorithms.filter(algorithm => algorithm.algorithmId === hashAlgorithmOID).length === 0) {
			this.digestAlgorithms.push(new _AlgorithmIdentifier2.default({
				algorithmId: hashAlgorithmOID,
				algorithmParams: new asn1js.Null()
			}));
		}

		this.signerInfos[signerIndex].digestAlgorithm = new _AlgorithmIdentifier2.default({
			algorithmId: hashAlgorithmOID,
			algorithmParams: new asn1js.Null()
		});
		//endregion

		//region Get a "default parameters" for current algorithm and set correct signature algorithm
		sequence = sequence.then(() => engine.subtle.getSignatureParameters(privateKey, hashAlgorithm));

		sequence = sequence.then(result => {
			parameters = result.parameters;
			this.signerInfos[signerIndex].signatureAlgorithm = result.signatureAlgorithm;
		});
		//endregion

		//region Create TBS data for signing
		sequence = sequence.then(() => {
			if ("signedAttrs" in this.signerInfos[signerIndex]) {
				if (this.signerInfos[signerIndex].signedAttrs.encodedValue.byteLength !== 0) data = this.signerInfos[signerIndex].signedAttrs.encodedValue;else {
					data = this.signerInfos[signerIndex].signedAttrs.toSchema(true).toBER(false);

					//region Change type from "[0]" to "SET" acordingly to standard
					const view = new Uint8Array(data);
					view[0] = 0x31;
					//endregion
				}
			} else {
				if ("eContent" in this.encapContentInfo) // Attached data
					{
						if (this.encapContentInfo.eContent.idBlock.tagClass === 1 && this.encapContentInfo.eContent.idBlock.tagNumber === 4) {
							if (this.encapContentInfo.eContent.idBlock.isConstructed === false) data = this.encapContentInfo.eContent.valueBlock.valueHex;else {
								var _iteratorNormalCompletion7 = true;
								var _didIteratorError7 = false;
								var _iteratorError7 = undefined;

								try {
									for (var _iterator7 = this.encapContentInfo.eContent.valueBlock.value[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
										const content = _step7.value;

										data = (0, _pvutils.utilConcatBuf)(data, content.valueBlock.valueHex);
									}
								} catch (err) {
									_didIteratorError7 = true;
									_iteratorError7 = err;
								} finally {
									try {
										if (!_iteratorNormalCompletion7 && _iterator7.return) {
											_iterator7.return();
										}
									} finally {
										if (_didIteratorError7) {
											throw _iteratorError7;
										}
									}
								}
							}
						} else data = this.encapContentInfo.eContent.valueBlock.valueBeforeDecode;
					} else // Detached data
					{
						if (data.byteLength === 0) // Check that "data" already provided by function parameter
							return Promise.reject("Missed detached data input array");
					}
			}

			return Promise.resolve();
		});
		//endregion

		//region Signing TBS data on provided private key
		sequence = sequence.then(() => engine.subtle.signWithPrivateKey(data, privateKey, parameters));

		sequence = sequence.then(result => {
			this.signerInfos[signerIndex].signature = new asn1js.OctetString({ valueHex: result });

			return result;
		});
		//endregion

		return sequence;
	}
	//**********************************************************************************
}
exports.default = SignedData; //**************************************************************************************
//# sourceMappingURL=SignedData.js.map