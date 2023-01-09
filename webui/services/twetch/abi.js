import schema from "./abi-json";
import { Hash } from "bsv-wasm";

class ABI {
  constructor(args, action) {
    this.args = args;
  }

  action(actionName) {
    const action = schema?.actions?.[actionName];

    if (!action) {
      throw new Error("ABI Error: action not found in abi schema");
    }

    this.action = action;

    return this;
  }

  replace(replace, value) {
    const index = this.action.args.findIndex((e) => e.replaceValue === replace);
    this.args[index] = value;
    this.validate();
    return this;
  }

  setArg(name, value) {
    const index = this.action.args.findIndex((e) => e.name === name);
    this.args[index] = value;
    this.validate();
    return this;
  }

  fromObject(payload) {
    if (!payload) {
      payload = {};
    }

    this.args = this.action.args.map(
      (e, i) =>
        payload[e.name] ||
        this.args[i] ||
        e.value ||
        e.replaceValue ||
        e.defaultValue
    );
    this.validate();
    return this;
  }

  fromArgs(args) {
    this.args = args;
    this.validate();
    return this;
  }

  toArray() {
    return this.args;
  }

  toChunks() {
    return this.args.map((e) => Buffer.from(e));
  }

  toObject() {
    return this.action.args
      .map((e, i) => ({
        ...e,
        value: this.args[i] === "null" ? null : this.args[i],
      }))
      .reduce((a, e) => Object.assign(a, { [e.name]: e.value }), {});
  }

  contentHash() {
    if (!this.action.args.length) {
      return;
    }

    const arg = this.action.args.find((e) => e.type === "Signature");
    const value = Buffer.concat(
      this.toChunks().slice(arg.messageStartIndex || 0, arg.messageEndIndex + 1)
    );

    return Hash.sha256(value).toHex();
  }

  validate() {
    return true;
  }
}

export default ABI;
