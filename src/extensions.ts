import {StringFactory} from './string-factory';
import {
    camelCase, snakeCase, pascalCase, paramCase, capitalCase, constantCase, dotCase,
    noCase, pathCase, sentenceCase
} from 'change-case';
import {escape, unescape, escapeRegExp, trimChar, words} from './core';

String.prototype.CharAt = function (pos: number): string {
    if (this.length - 1 < pos) {
        throw new Error(`the string has not enough Characters searching ${pos} string length are ${this.length}`);
    }
    return this[pos];
};

String.prototype.Capitalize = function (): string {
    if (this.length < 1) {
        return this.valueOf();
    }
    const first = this[0];
    const others = this.slice(1, this.length);
    return `${first.ToUpper!()}${others.ToLower!()}`;
};

String.prototype.ToCamelCase = function (): string {
    return camelCase(this.valueOf());
};

String.prototype.ToConstantCase = function (): string {
    return constantCase(this.valueOf());
};

String.prototype.ToDotCase = function(): string {
    return dotCase(this.valueOf());
};

String.prototype.ToNoCase = function (): string {
    return noCase(this.valueOf());
};

String.prototype.ToPathCase = function (): string {
    return pathCase(this.valueOf());
};

String.prototype.ToSentenceCase = function (): string {
    return sentenceCase(this.valueOf());
};

String.prototype.StartsWith = function (search: string, position: number): boolean {
    return this.startsWith(search, position ? position : 0);
};

String.prototype.EndsWith = function (search: string, position: number): boolean {
    return this.endsWith(search, position ? position : this.length);
};

String.prototype.HTMLEscape = function (): string {
    return escape(this.valueOf());
};

String.prototype.HTMLUnescape = function (): string {
    return unescape(this.valueOf());
};

String.prototype.RegExpEscape = function (): string {
    return escapeRegExp(this.valueOf());
};

String.prototype.ToKebabCase = function (): string {
    return paramCase(this.valueOf());
};

String.prototype.ToSnakeCase = function (): string {
    return snakeCase(this.valueOf());
};

String.prototype.ToCapitalCase = function (): string {
    return capitalCase(this.valueOf());
};

String.prototype.ToPascalCase = function(): string {
    return pascalCase(this.valueOf());
};

String.prototype.ToLowerCase = function (): string {
    return this.toLocaleLowerCase();
};

String.prototype.ToUpperCase = function (): string {
    return this.toUpperCase();
};

String.prototype.LowerFirst = function (): string {
    return `${this[0].toLowerCase()}${this.slice(1, this.length)}`;
};

String.prototype.UpperFirst = function (): string {
    return `${this[0].toUpperCase()}${this.slice(1, this.length)}`;
};

String.prototype.Words = function (filter: (word: string) => boolean, pattern: string): string[] {
    const tmp = words(this.valueOf(), pattern);
    if (typeof filter === 'function') {
        const tmp2 = [];
        for (let i = 0; i < tmp.length; i++) {
            if (filter(tmp[i])) {
                tmp2.push(tmp[i]);
            }
        }
        return tmp2;
    }
    return tmp;
};

String.prototype.Concat = function (appender: string, separator: string): string {
    if (!StringFactory.IsNullOrEmpty(separator) && !StringFactory.IsNullOrEmpty(this.valueOf())) {
        return this + separator + appender;
    }
    return this + appender;
};

String.prototype.Join = function (appender: string[], separator: string): string {
    if (!Array.isArray(appender) || appender.length < 1) {
        return this.valueOf();
    }
    if (!separator) {
        separator = '';
    }
    let res = this.valueOf();
    for (const str of appender) {
        res += separator + str;
    }
    return res.TrimStart!(separator);
};

String.prototype.Pad = function (length: number, template: string): string {
    template = StringFactory.IsNullOrEmpty(template) ? ' ' : template;
    let tmp = this;
    let sw = false;
    while (tmp.length < length) {
        if (sw) {
            for (let i = template.length-1; i >= 0; i--) {
                tmp = template[i] + tmp;
                if (tmp.length >= length) {
                    break;
                }
            }
        } else {
            for (let i = 0; i < template.length; i++) {
                tmp = tmp + template[i];
                if (tmp.length >= length) {
                    break;
                }
            }
        }
        sw = !sw;
    }
    return tmp.valueOf();
};

String.prototype.PadLeft = function (length: number, template: string): string {
    template = StringFactory.IsNullOrEmpty(template) ? ' ' : template;
    return this.padStart(length, template);
};

String.prototype.PadRight = function (length: number, template: string): string {
    template = StringFactory.IsNullOrEmpty(template) ? ' ' : template;
    return this.padEnd(length, template);
};

String.prototype.Repeat = function (times: number): string {
    let tmp = '';
    for (let i = 0; i < times; i++) {
        tmp += this;
    }
    return tmp;
};

String.prototype.Replace = function (search: string, replacer: string): string {
    return this.replace(search, replacer);
};

String.prototype.ReplaceAll = function (search: string, replacer: string): string {
    return this.split(search).join(replacer);
};

String.prototype.Split = function (pattern: string): string[] {
    if (StringFactory.IsNullOrEmpty(this.valueOf())) {
        return [];
    }
    const tmp = [];
    for (const el of this.split(pattern)) {
        if (!!el) {
            tmp.push(el);
        }
    }
    return tmp;
};

String.prototype.ToLower = function (): string {
    return this.toLowerCase();
};

String.prototype.ToUpper = function (): string {
    return this.toUpperCase();
};

String.prototype.Trim = function (sequence: string): string {
    if (!sequence) {
        return trimChar(this.valueOf(), ' ', 2);
    }
    return trimChar(this.valueOf(), sequence, 2);
};

String.prototype.TrimStart = function (sequence: string): string {
    if (!sequence) {
        return trimChar(this.valueOf(), ' ', 0);
    }
    return trimChar(this.valueOf(), sequence, 0);
};

String.prototype.TrimEnd = function (sequence: string): string {
    if (!sequence) {
        return trimChar(this.valueOf(), ' ', 1);
    }
    return trimChar(this.valueOf(), sequence, 1);
};

String.prototype.Truncate = function (length: number, omission: string, separator: string): string {
    let tmp = '';
    const cutter = omission ? omission : '...';
    for (let i = 0; i < this.length; i++) {
        if (tmp.length >= length || tmp.endsWith(separator)) {
            return tmp.substr(0, tmp.length - cutter.length) + cutter;
        }
        tmp += this[i];
    }
    return tmp;
};

String.prototype.Copy = function (): string {
    return `${this}`;
};

String.prototype.Contains = function (search: string): boolean {
    return this.includes(search);
};

String.prototype.ContainsCount = function (search: string, allowOverlapping: boolean): number {
    if (search.length <= 0) {
        return 0;
    }

    let n = 0;
    let pos = 0;
    let step = allowOverlapping ? 1 : search.length;

    while (true) {
        pos = this.indexOf(search, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
};

String.prototype.Equals = function (value: string): boolean {
    return this.valueOf() === value;
};

String.prototype.Insert = function (startIndex: number, value: string): string {
    if (startIndex < 0) {
        startIndex = 0;
    }
    if (startIndex > this.length) {
        startIndex = this.length;
    }
    return this.slice(0, startIndex) + value + this.slice(startIndex, this.length);
};

String.prototype.Remove = function (position: number, count: number): string {
    let charsCanBeRemoved = this.length;
    if (position < 0) {
        position = 0;
    }
    if (position > this.length) {
        position = this.length - 1;
        charsCanBeRemoved = 1;
    }
    if (count > charsCanBeRemoved) {
        position = position - (count - charsCanBeRemoved);
    }
    return this.substr(0, position) + this.substring(position + (count ? count : 1), this.length);
};

String.prototype.Substring = function (position: number, length: number): string {
    if (!length || length < 1) {
        length = 1;
    }
    if (position < 0) {
        position = 0;
    }
    if (position > this.length) {
        position = this.length - length;
    }
    return this.substr(position, length);
};

String.prototype.ToInteger = function (): number {
    const res = parseInt(this.valueOf(), 10);
    if (isNaN(res)) {
        return 0;
    }
    return res;
};

String.prototype.ToDouble = function (): number {
    const res = parseFloat(this.valueOf());
    if (isNaN(res)) {
        return 0.0;
    }
    return res;
};

String.prototype.IndexOf = function (value: string): number {
    return this.indexOf(value);
};

String.prototype.LastIndexOf = function (value: string): number {
    let currentPosition = -1;
    let idx = this.indexOf(value, 0);
    while (idx !== -1) {
        currentPosition = idx;
        idx = this.indexOf(value, currentPosition + 1);
    }
    return currentPosition;
};

String.prototype.TextBetween = function (begin: string, end: string): string[] {
    const tmp = [];
    for (const split of this.split(begin)) {
        const between = split.split(end)[0];
        if (between) {
            tmp.push(between);
        }
    }
    if (!this.StartsWith!(begin) || this.EndsWith!(tmp[0])) {
        // remove the begin string
        tmp.splice(0, 1);
    }
    return tmp;
};

String.prototype.IsAscii = function (): boolean {
    for (let i = 0; i < this.length; i++) {
        if (this.charCodeAt(i) > 127) {
            return false;
        }
    }
    return true;
};

String.prototype.IsAlpha = function (): boolean {
    for (let i = 0; i < this.length; i++) {
        const charCode = this.charCodeAt(i);
        if (!(charCode >= 65 && charCode <= 90) &&
            !(charCode >= 97 && charCode <= 122)) {
            return false;
        }
    }
    return true;
};

String.prototype.Bytes = function (): number {
    return Buffer.byteLength(this.valueOf());
};
