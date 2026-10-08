import e, { createContext as t, useCallback as n, useContext as r, useEffect as i, useMemo as a, useRef as o, useState as s } from "react";
import { jsx as c, jsxs as l } from "react/jsx-runtime";
//#region node_modules/clsx/dist/clsx.mjs
function u(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") {
		if (Array.isArray(e)) {
			var i = e.length;
			for (t = 0; t < i; t++) e[t] && (n = u(e[t])) && (r && (r += " "), r += n);
		} else for (n in e) e[n] && (r && (r += " "), r += n);
	}
	return r;
}
function d() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = u(e)) && (r && (r += " "), r += t);
	return r;
}
//#endregion
//#region node_modules/tailwind-merge/dist/bundle-mjs.mjs
var f = (e, t) => {
	let n = Array(e.length + t.length);
	for (let t = 0; t < e.length; t++) n[t] = e[t];
	for (let r = 0; r < t.length; r++) n[e.length + r] = t[r];
	return n;
}, p = (e, t) => ({
	classGroupId: e,
	validator: t
}), m = (e = /* @__PURE__ */ new Map(), t = null, n) => ({
	nextPart: e,
	validators: t,
	classGroupId: n
}), h = "-", g = [], _ = "arbitrary..", v = (e) => {
	let t = x(e), { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e;
	return {
		getClassGroupId: (e) => {
			if (e.startsWith("[") && e.endsWith("]")) return b(e);
			let n = e.split(h);
			return y(n, +(n[0] === "" && n.length > 1), t);
		},
		getConflictingClassGroupIds: (e, t) => {
			if (t) {
				let t = r[e], i = n[e];
				return t ? i ? f(i, t) : t : i || g;
			}
			return n[e] || g;
		}
	};
}, y = (e, t, n) => {
	if (e.length - t === 0) return n.classGroupId;
	let r = e[t], i = n.nextPart.get(r);
	if (i) {
		let n = y(e, t + 1, i);
		if (n) return n;
	}
	let a = n.validators;
	if (a === null) return;
	let o = t === 0 ? e.join(h) : e.slice(t).join(h), s = a.length;
	for (let e = 0; e < s; e++) {
		let t = a[e];
		if (t.validator(o)) return t.classGroupId;
	}
}, b = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
	let t = e.slice(1, -1), n = t.indexOf(":"), r = t.slice(0, n);
	return r ? _ + r : void 0;
})(), x = (e) => {
	let { theme: t, classGroups: n } = e;
	return S(n, t);
}, S = (e, t) => {
	let n = m();
	for (let r in e) {
		let i = e[r];
		C(i, n, r, t);
	}
	return n;
}, C = (e, t, n, r) => {
	let i = e.length;
	for (let a = 0; a < i; a++) {
		let i = e[a];
		w(i, t, n, r);
	}
}, w = (e, t, n, r) => {
	if (typeof e == "string") {
		T(e, t, n);
		return;
	}
	if (typeof e == "function") {
		ee(e, t, n, r);
		return;
	}
	te(e, t, n, r);
}, T = (e, t, n) => {
	let r = e === "" ? t : E(t, e);
	r.classGroupId = n;
}, ee = (e, t, n, r) => {
	if (ne(e)) {
		C(e(r), t, n, r);
		return;
	}
	t.validators === null && (t.validators = []), t.validators.push(p(n, e));
}, te = (e, t, n, r) => {
	let i = Object.entries(e), a = i.length;
	for (let e = 0; e < a; e++) {
		let [a, o] = i[e];
		C(o, E(t, a), n, r);
	}
}, E = (e, t) => {
	let n = e, r = t.split(h), i = r.length;
	for (let e = 0; e < i; e++) {
		let t = r[e], i = n.nextPart.get(t);
		i || (i = m(), n.nextPart.set(t, i)), n = i;
	}
	return n;
}, ne = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, re = (e) => {
	if (e < 1) return {
		get: () => void 0,
		set: () => {}
	};
	let t = 0, n = Object.create(null), r = Object.create(null), i = (i, a) => {
		n[i] = a, t++, t > e && (t = 0, r = n, n = Object.create(null));
	};
	return {
		get(e) {
			let t = n[e];
			if (t !== void 0) return t;
			if ((t = r[e]) !== void 0) return i(e, t), t;
		},
		set(e, t) {
			e in n ? n[e] = t : i(e, t);
		}
	};
}, D = "!", O = ":", k = [], A = (e, t, n, r, i) => ({
	modifiers: e,
	hasImportantModifier: t,
	baseClassName: n,
	maybePostfixModifierPosition: r,
	isExternal: i
}), ie = (e) => {
	let { prefix: t, experimentalParseClassName: n } = e, r = (e) => {
		let t = [], n = 0, r = 0, i = 0, a, o = e.length;
		for (let s = 0; s < o; s++) {
			let o = e[s];
			if (n === 0 && r === 0) {
				if (o === O) {
					t.push(e.slice(i, s)), i = s + 1;
					continue;
				}
				if (o === "/") {
					a = s;
					continue;
				}
			}
			o === "[" ? n++ : o === "]" ? n-- : o === "(" ? r++ : o === ")" && r--;
		}
		let s = t.length === 0 ? e : e.slice(i), c = s, l = !1;
		s.endsWith(D) ? (c = s.slice(0, -1), l = !0) : s.startsWith(D) && (c = s.slice(1), l = !0);
		let u = a && a > i ? a - i : void 0;
		return A(t, l, c, u);
	};
	if (t) {
		let e = t + O, n = r;
		r = (t) => t.startsWith(e) ? n(t.slice(e.length)) : A(k, !1, t, void 0, !0);
	}
	if (n) {
		let e = r;
		r = (t) => n({
			className: t,
			parseClassName: e
		});
	}
	return r;
}, j = (e) => {
	let t = /* @__PURE__ */ new Map();
	return e.orderSensitiveModifiers.forEach((e, n) => {
		t.set(e, 1e6 + n);
	}), (e) => {
		let n = [], r = [];
		for (let i = 0; i < e.length; i++) {
			let a = e[i], o = a[0] === "[", s = t.has(a);
			o || s ? (r.length > 0 && (r.sort(), n.push(...r), r = []), n.push(a)) : r.push(a);
		}
		return r.length > 0 && (r.sort(), n.push(...r)), n;
	};
}, ae = (e) => ({
	cache: re(e.cacheSize),
	parseClassName: ie(e),
	sortModifiers: j(e),
	postfixLookupClassGroupIds: oe(e),
	...v(e)
}), oe = (e) => {
	let t = Object.create(null), n = e.postfixLookupClassGroups;
	if (n) for (let e = 0; e < n.length; e++) t[n[e]] = !0;
	return t;
}, se = /\s+/, ce = (e, t) => {
	let { parseClassName: n, getClassGroupId: r, getConflictingClassGroupIds: i, sortModifiers: a, postfixLookupClassGroupIds: o } = t, s = [], c = e.trim().split(se), l = "";
	for (let e = c.length - 1; e >= 0; --e) {
		let t = c[e], { isExternal: u, modifiers: d, hasImportantModifier: f, baseClassName: p, maybePostfixModifierPosition: m } = n(t);
		if (u) {
			l = t + (l.length > 0 ? " " + l : l);
			continue;
		}
		let h = !!m, g;
		if (h) {
			g = r(p.substring(0, m));
			let e = g && o[g] ? r(p) : void 0;
			e && e !== g && (g = e, h = !1);
		} else g = r(p);
		if (!g) {
			if (!h) {
				l = t + (l.length > 0 ? " " + l : l);
				continue;
			}
			if (g = r(p), !g) {
				l = t + (l.length > 0 ? " " + l : l);
				continue;
			}
			h = !1;
		}
		let _ = d.length === 0 ? "" : d.length === 1 ? d[0] : a(d).join(":"), v = f ? _ + D : _, y = v + g;
		if (s.indexOf(y) > -1) continue;
		s.push(y);
		let b = i(g, h);
		for (let e = 0; e < b.length; ++e) {
			let t = b[e];
			s.push(v + t);
		}
		l = t + (l.length > 0 ? " " + l : l);
	}
	return l;
}, M = (...e) => {
	let t = 0, n, r, i = "";
	for (; t < e.length;) (n = e[t++]) && (r = N(n)) && (i && (i += " "), i += r);
	return i;
}, N = (e) => {
	if (typeof e == "string") return e;
	let t, n = "";
	for (let r = 0; r < e.length; r++) e[r] && (t = N(e[r])) && (n && (n += " "), n += t);
	return n;
}, P = (e, ...t) => {
	let n, r, i, a, o = (o) => (n = ae(t.reduce((e, t) => t(e), e())), r = n.cache.get, i = n.cache.set, a = s, s(o)), s = (e) => {
		let t = r(e);
		if (t) return t;
		let a = ce(e, n);
		return i(e, a), a;
	};
	return a = o, (...e) => a(M(...e));
}, le = [], F = (e) => {
	let t = (t) => t[e] || le;
	return t.isThemeGetter = !0, t.themeKey = e, t;
}, I = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, ue = /^\((?:(\w[\w-]*):)?(.+)\)$/i, L = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, R = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, de = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, z = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix|color|light-dark)\(.+\)$/, fe = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, pe = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, B = (e) => L.test(e), V = (e) => !!e && !Number.isNaN(Number(e)), H = (e) => !!e && Number.isInteger(Number(e)), me = (e) => e.endsWith("%") && V(e.slice(0, -1)), U = (e) => R.test(e), he = () => !0, ge = (e) => de.test(e) && !z.test(e), _e = () => !1, ve = (e) => fe.test(e), ye = (e) => pe.test(e), be = (e) => !W(e) && !K(e), xe = (e) => e.startsWith("@container") && (e[10] === "/" && e[11] !== void 0 || e[11] === "s" && e[16] !== void 0 && e.startsWith("-size/", 10) || e[11] === "n" && e[18] !== void 0 && e.startsWith("-normal/", 10)), Se = (e) => J(e, Le, _e), W = (e) => I.test(e), G = (e) => J(e, Re, ge), Ce = (e) => J(e, ze, V), we = (e) => J(e, Ve, he), Te = (e) => J(e, Be, _e), Ee = (e) => J(e, Fe, _e), De = (e) => J(e, Ie, ye), Oe = (e) => J(e, He, ve), K = (e) => ue.test(e), q = (e) => Y(e, Re), ke = (e) => Y(e, Be), Ae = (e) => Y(e, Fe), je = (e) => Y(e, Le), Me = (e) => Y(e, Ie), Ne = (e) => Y(e, He, !0), Pe = (e) => Y(e, Ve, !0), J = (e, t, n) => {
	let r = I.exec(e);
	return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, Y = (e, t, n = !1) => {
	let r = ue.exec(e);
	return r ? r[1] ? t(r[1]) : n : !1;
}, Fe = (e) => e === "position" || e === "percentage", Ie = (e) => e === "image" || e === "url", Le = (e) => e === "length" || e === "size" || e === "bg-size", Re = (e) => e === "length", ze = (e) => e === "number", Be = (e) => e === "family-name", Ve = (e) => e === "number" || e === "weight", He = (e) => e === "shadow", Ue = /*#__PURE__*/ P(() => {
	let e = F("color"), t = F("font"), n = F("text"), r = F("font-weight"), i = F("tracking"), a = F("leading"), o = F("breakpoint"), s = F("container"), c = F("spacing"), l = F("radius"), u = F("shadow"), d = F("inset-shadow"), f = F("text-shadow"), p = F("drop-shadow"), m = F("blur"), h = F("perspective"), g = F("aspect"), _ = F("ease"), v = F("animate"), y = () => [
		"auto",
		"avoid",
		"all",
		"avoid-page",
		"page",
		"left",
		"right",
		"column"
	], b = () => [
		"center",
		"top",
		"bottom",
		"left",
		"right",
		"top-left",
		"left-top",
		"top-right",
		"right-top",
		"bottom-right",
		"right-bottom",
		"bottom-left",
		"left-bottom"
	], x = () => [
		...b(),
		K,
		W
	], S = () => [
		"auto",
		"hidden",
		"clip",
		"visible",
		"scroll"
	], C = () => [
		"auto",
		"contain",
		"none"
	], w = () => [
		K,
		W,
		c
	], T = () => [
		B,
		"full",
		"auto",
		...w()
	], ee = () => [
		H,
		"none",
		"subgrid",
		K,
		W
	], te = () => [
		"auto",
		{ span: [
			"full",
			H,
			K,
			W
		] },
		H,
		K,
		W
	], E = () => [
		H,
		"auto",
		K,
		W
	], ne = () => [
		"auto",
		"min",
		"max",
		"fr",
		K,
		W
	], re = () => [
		"start",
		"end",
		"center",
		"between",
		"around",
		"evenly",
		"stretch",
		"baseline",
		"center-safe",
		"end-safe"
	], D = () => [
		"start",
		"end",
		"center",
		"stretch",
		"center-safe",
		"end-safe"
	], O = () => ["auto", ...w()], k = () => [
		B,
		"auto",
		"full",
		"dvw",
		"dvh",
		"lvw",
		"lvh",
		"svw",
		"svh",
		"min",
		"max",
		"fit",
		...w()
	], A = () => [
		s,
		B,
		"screen",
		"full",
		"dvw",
		"lvw",
		"svw",
		"min",
		"max",
		"fit",
		...w()
	], ie = () => [
		B,
		"screen",
		"full",
		"lh",
		"dvh",
		"lvh",
		"svh",
		"min",
		"max",
		"fit",
		...w()
	], j = () => [
		e,
		K,
		W
	], ae = () => [
		...b(),
		Ae,
		Ee,
		{ position: [K, W] }
	], oe = () => ["no-repeat", { repeat: [
		"",
		"x",
		"y",
		"space",
		"round"
	] }], se = () => [
		"auto",
		"cover",
		"contain",
		je,
		Se,
		{ size: [K, W] }
	], ce = () => [
		me,
		q,
		G
	], M = () => [
		"",
		"none",
		"full",
		l,
		K,
		W
	], N = () => [
		"",
		V,
		q,
		G
	], P = () => [
		"solid",
		"dashed",
		"dotted",
		"double"
	], le = () => [
		"normal",
		"multiply",
		"screen",
		"overlay",
		"darken",
		"lighten",
		"color-dodge",
		"color-burn",
		"hard-light",
		"soft-light",
		"difference",
		"exclusion",
		"hue",
		"saturation",
		"color",
		"luminosity"
	], I = () => [
		V,
		me,
		Ae,
		Ee
	], ue = () => [
		"",
		"none",
		m,
		K,
		W
	], L = () => [
		"none",
		V,
		K,
		W
	], R = () => [
		"none",
		V,
		K,
		W
	], de = () => [
		V,
		K,
		W
	], z = () => [
		B,
		"full",
		...w()
	];
	return {
		cacheSize: 500,
		theme: {
			animate: [
				"spin",
				"ping",
				"pulse",
				"bounce"
			],
			aspect: ["video"],
			blur: [U],
			breakpoint: [U],
			color: [he],
			container: [U],
			"drop-shadow": [U],
			ease: [
				"in",
				"out",
				"in-out"
			],
			font: [be],
			"font-weight": [
				"thin",
				"extralight",
				"light",
				"normal",
				"medium",
				"semibold",
				"bold",
				"extrabold",
				"black"
			],
			"inset-shadow": [U],
			leading: [
				"none",
				"tight",
				"snug",
				"normal",
				"relaxed",
				"loose"
			],
			perspective: [
				"dramatic",
				"near",
				"normal",
				"midrange",
				"distant",
				"none"
			],
			radius: [U],
			shadow: [U],
			spacing: ["px", V],
			text: [U],
			"text-shadow": [U],
			tracking: [
				"tighter",
				"tight",
				"normal",
				"wide",
				"wider",
				"widest"
			]
		},
		classGroups: {
			aspect: [{ aspect: [
				"auto",
				"square",
				B,
				W,
				K,
				g
			] }],
			container: ["container"],
			"container-type": [{ "@container": [
				"",
				"normal",
				"size",
				K,
				W
			] }],
			"container-named": [xe],
			columns: [{ columns: [
				V,
				"auto",
				W,
				K,
				s
			] }],
			"break-after": [{ "break-after": y() }],
			"break-before": [{ "break-before": y() }],
			"break-inside": [{ "break-inside": [
				"auto",
				"avoid",
				"avoid-page",
				"avoid-column"
			] }],
			"box-decoration": [{ "box-decoration": ["slice", "clone"] }],
			box: [{ box: ["border", "content"] }],
			display: [
				"block",
				"inline-block",
				"inline",
				"flex",
				"inline-flex",
				"table",
				"inline-table",
				"table-caption",
				"table-cell",
				"table-column",
				"table-column-group",
				"table-footer-group",
				"table-header-group",
				"table-row-group",
				"table-row",
				"flow-root",
				"grid",
				"inline-grid",
				"contents",
				"list-item",
				"hidden"
			],
			sr: ["sr-only", "not-sr-only"],
			float: [{ float: [
				"right",
				"left",
				"none",
				"start",
				"end"
			] }],
			clear: [{ clear: [
				"left",
				"right",
				"both",
				"none",
				"start",
				"end"
			] }],
			isolation: ["isolate", "isolation-auto"],
			"object-fit": [{ object: [
				"contain",
				"cover",
				"fill",
				"none",
				"scale-down"
			] }],
			"object-position": [{ object: x() }],
			overflow: [{ overflow: S() }],
			"overflow-x": [{ "overflow-x": S() }],
			"overflow-y": [{ "overflow-y": S() }],
			overscroll: [{ overscroll: C() }],
			"overscroll-x": [{ "overscroll-x": C() }],
			"overscroll-y": [{ "overscroll-y": C() }],
			position: [
				"static",
				"fixed",
				"absolute",
				"relative",
				"sticky"
			],
			inset: [{ inset: T() }],
			"inset-x": [{ "inset-x": T() }],
			"inset-y": [{ "inset-y": T() }],
			start: [{
				"inset-s": T(),
				start: T()
			}],
			end: [{
				"inset-e": T(),
				end: T()
			}],
			"inset-bs": [{ "inset-bs": T() }],
			"inset-be": [{ "inset-be": T() }],
			top: [{ top: T() }],
			right: [{ right: T() }],
			bottom: [{ bottom: T() }],
			left: [{ left: T() }],
			visibility: [
				"visible",
				"invisible",
				"collapse"
			],
			z: [{ z: [
				H,
				"auto",
				K,
				W
			] }],
			basis: [{ basis: [
				B,
				"full",
				"auto",
				s,
				...w()
			] }],
			"flex-direction": [{ flex: [
				"row",
				"row-reverse",
				"col",
				"col-reverse"
			] }],
			"flex-wrap": [{ flex: [
				"nowrap",
				"wrap",
				"wrap-reverse"
			] }],
			flex: [{ flex: [
				V,
				B,
				"auto",
				"initial",
				"none",
				W
			] }],
			grow: [{ grow: [
				"",
				V,
				K,
				W
			] }],
			shrink: [{ shrink: [
				"",
				V,
				K,
				W
			] }],
			order: [{ order: [
				H,
				"first",
				"last",
				"none",
				K,
				W
			] }],
			"grid-cols": [{ "grid-cols": ee() }],
			"col-start-end": [{ col: te() }],
			"col-start": [{ "col-start": E() }],
			"col-end": [{ "col-end": E() }],
			"grid-rows": [{ "grid-rows": ee() }],
			"row-start-end": [{ row: te() }],
			"row-start": [{ "row-start": E() }],
			"row-end": [{ "row-end": E() }],
			"grid-flow": [{ "grid-flow": [
				"row",
				"col",
				"dense",
				"row-dense",
				"col-dense"
			] }],
			"auto-cols": [{ "auto-cols": ne() }],
			"auto-rows": [{ "auto-rows": ne() }],
			gap: [{ gap: w() }],
			"gap-x": [{ "gap-x": w() }],
			"gap-y": [{ "gap-y": w() }],
			"justify-content": [{ justify: [...re(), "normal"] }],
			"justify-items": [{ "justify-items": [...D(), "normal"] }],
			"justify-self": [{ "justify-self": ["auto", ...D()] }],
			"align-content": [{ content: ["normal", ...re()] }],
			"align-items": [{ items: [...D(), { baseline: ["", "last"] }] }],
			"align-self": [{ self: [
				"auto",
				...D(),
				{ baseline: ["", "last"] }
			] }],
			"place-content": [{ "place-content": re() }],
			"place-items": [{ "place-items": [...D(), "baseline"] }],
			"place-self": [{ "place-self": ["auto", ...D()] }],
			p: [{ p: w() }],
			px: [{ px: w() }],
			py: [{ py: w() }],
			ps: [{ ps: w() }],
			pe: [{ pe: w() }],
			pbs: [{ pbs: w() }],
			pbe: [{ pbe: w() }],
			pt: [{ pt: w() }],
			pr: [{ pr: w() }],
			pb: [{ pb: w() }],
			pl: [{ pl: w() }],
			m: [{ m: O() }],
			mx: [{ mx: O() }],
			my: [{ my: O() }],
			ms: [{ ms: O() }],
			me: [{ me: O() }],
			mbs: [{ mbs: O() }],
			mbe: [{ mbe: O() }],
			mt: [{ mt: O() }],
			mr: [{ mr: O() }],
			mb: [{ mb: O() }],
			ml: [{ ml: O() }],
			"space-x": [{ "space-x": w() }],
			"space-x-reverse": ["space-x-reverse"],
			"space-y": [{ "space-y": w() }],
			"space-y-reverse": ["space-y-reverse"],
			size: [{ size: k() }],
			"inline-size": [{ inline: ["auto", ...A()] }],
			"min-inline-size": [{ "min-inline": ["auto", ...A()] }],
			"max-inline-size": [{ "max-inline": ["none", ...A()] }],
			"block-size": [{ block: ["auto", ...ie()] }],
			"min-block-size": [{ "min-block": ["auto", ...ie()] }],
			"max-block-size": [{ "max-block": ["none", ...ie()] }],
			w: [{ w: [
				s,
				"screen",
				...k()
			] }],
			"min-w": [{ "min-w": [
				s,
				"screen",
				"none",
				...k()
			] }],
			"max-w": [{ "max-w": [
				s,
				"screen",
				"none",
				"prose",
				{ screen: [o] },
				...k()
			] }],
			h: [{ h: [
				"screen",
				"lh",
				...k()
			] }],
			"min-h": [{ "min-h": [
				"screen",
				"lh",
				"none",
				...k()
			] }],
			"max-h": [{ "max-h": [
				"screen",
				"lh",
				"none",
				...k()
			] }],
			"font-size": [{ text: [
				"base",
				n,
				q,
				G
			] }],
			"font-smoothing": ["antialiased", "subpixel-antialiased"],
			"font-style": ["italic", "not-italic"],
			"font-weight": [{ font: [
				r,
				Pe,
				we
			] }],
			"font-stretch": [{ "font-stretch": [
				"ultra-condensed",
				"extra-condensed",
				"condensed",
				"semi-condensed",
				"normal",
				"semi-expanded",
				"expanded",
				"extra-expanded",
				"ultra-expanded",
				me,
				W
			] }],
			"font-family": [{ font: [
				ke,
				Te,
				t
			] }],
			"font-features": [{ "font-features": [W] }],
			"fvn-normal": ["normal-nums"],
			"fvn-ordinal": ["ordinal"],
			"fvn-slashed-zero": ["slashed-zero"],
			"fvn-figure": ["lining-nums", "oldstyle-nums"],
			"fvn-spacing": ["proportional-nums", "tabular-nums"],
			"fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
			tracking: [{ tracking: [
				i,
				K,
				W
			] }],
			"line-clamp": [{ "line-clamp": [
				V,
				"none",
				K,
				Ce
			] }],
			leading: [{ leading: [
				"none",
				a,
				...w()
			] }],
			"list-image": [{ "list-image": [
				"none",
				K,
				W
			] }],
			"list-style-position": [{ list: ["inside", "outside"] }],
			"list-style-type": [{ list: [
				"disc",
				"decimal",
				"none",
				K,
				W
			] }],
			"text-alignment": [{ text: [
				"left",
				"center",
				"right",
				"justify",
				"start",
				"end"
			] }],
			"placeholder-color": [{ placeholder: j() }],
			"text-color": [{ text: j() }],
			"text-decoration": [
				"underline",
				"overline",
				"line-through",
				"no-underline"
			],
			"text-decoration-style": [{ decoration: [...P(), "wavy"] }],
			"text-decoration-thickness": [{ decoration: [
				V,
				"from-font",
				"auto",
				K,
				G
			] }],
			"text-decoration-color": [{ decoration: j() }],
			"underline-offset": [{ "underline-offset": [
				V,
				"auto",
				K,
				W
			] }],
			"text-transform": [
				"uppercase",
				"lowercase",
				"capitalize",
				"normal-case"
			],
			"text-overflow": [
				"truncate",
				"text-ellipsis",
				"text-clip"
			],
			"text-wrap": [{ text: [
				"wrap",
				"nowrap",
				"balance",
				"pretty"
			] }],
			indent: [{ indent: w() }],
			"tab-size": [{ tab: [
				H,
				K,
				W
			] }],
			"vertical-align": [{ align: [
				"baseline",
				"top",
				"middle",
				"bottom",
				"text-top",
				"text-bottom",
				"sub",
				"super",
				K,
				W
			] }],
			whitespace: [{ whitespace: [
				"normal",
				"nowrap",
				"pre",
				"pre-line",
				"pre-wrap",
				"break-spaces"
			] }],
			break: [{ break: [
				"normal",
				"words",
				"all",
				"keep"
			] }],
			wrap: [{ wrap: [
				"break-word",
				"anywhere",
				"normal"
			] }],
			hyphens: [{ hyphens: [
				"none",
				"manual",
				"auto"
			] }],
			content: [{ content: [
				"none",
				K,
				W
			] }],
			"bg-attachment": [{ bg: [
				"fixed",
				"local",
				"scroll"
			] }],
			"bg-clip": [{ "bg-clip": [
				"border",
				"padding",
				"content",
				"text"
			] }],
			"bg-origin": [{ "bg-origin": [
				"border",
				"padding",
				"content"
			] }],
			"bg-position": [{ bg: ae() }],
			"bg-repeat": [{ bg: oe() }],
			"bg-size": [{ bg: se() }],
			"bg-image": [{ bg: [
				"none",
				{
					linear: [
						{ to: [
							"t",
							"tr",
							"r",
							"br",
							"b",
							"bl",
							"l",
							"tl"
						] },
						H,
						K,
						W
					],
					radial: [
						"",
						K,
						W
					],
					conic: [
						"",
						H,
						K,
						W
					]
				},
				Me,
				De
			] }],
			"bg-color": [{ bg: j() }],
			"gradient-from-pos": [{ from: ce() }],
			"gradient-via-pos": [{ via: ce() }],
			"gradient-to-pos": [{ to: ce() }],
			"gradient-from": [{ from: j() }],
			"gradient-via": [{ via: j() }],
			"gradient-to": [{ to: j() }],
			rounded: [{ rounded: M() }],
			"rounded-s": [{ "rounded-s": M() }],
			"rounded-e": [{ "rounded-e": M() }],
			"rounded-t": [{ "rounded-t": M() }],
			"rounded-r": [{ "rounded-r": M() }],
			"rounded-b": [{ "rounded-b": M() }],
			"rounded-l": [{ "rounded-l": M() }],
			"rounded-ss": [{ "rounded-ss": M() }],
			"rounded-se": [{ "rounded-se": M() }],
			"rounded-ee": [{ "rounded-ee": M() }],
			"rounded-es": [{ "rounded-es": M() }],
			"rounded-tl": [{ "rounded-tl": M() }],
			"rounded-tr": [{ "rounded-tr": M() }],
			"rounded-br": [{ "rounded-br": M() }],
			"rounded-bl": [{ "rounded-bl": M() }],
			"border-w": [{ border: N() }],
			"border-w-x": [{ "border-x": N() }],
			"border-w-y": [{ "border-y": N() }],
			"border-w-s": [{ "border-s": N() }],
			"border-w-e": [{ "border-e": N() }],
			"border-w-bs": [{ "border-bs": N() }],
			"border-w-be": [{ "border-be": N() }],
			"border-w-t": [{ "border-t": N() }],
			"border-w-r": [{ "border-r": N() }],
			"border-w-b": [{ "border-b": N() }],
			"border-w-l": [{ "border-l": N() }],
			"divide-x": [{ "divide-x": N() }],
			"divide-x-reverse": ["divide-x-reverse"],
			"divide-y": [{ "divide-y": N() }],
			"divide-y-reverse": ["divide-y-reverse"],
			"border-style": [{ border: [
				...P(),
				"hidden",
				"none"
			] }],
			"divide-style": [{ divide: [
				...P(),
				"hidden",
				"none"
			] }],
			"border-color": [{ border: j() }],
			"border-color-x": [{ "border-x": j() }],
			"border-color-y": [{ "border-y": j() }],
			"border-color-s": [{ "border-s": j() }],
			"border-color-e": [{ "border-e": j() }],
			"border-color-bs": [{ "border-bs": j() }],
			"border-color-be": [{ "border-be": j() }],
			"border-color-t": [{ "border-t": j() }],
			"border-color-r": [{ "border-r": j() }],
			"border-color-b": [{ "border-b": j() }],
			"border-color-l": [{ "border-l": j() }],
			"divide-color": [{ divide: j() }],
			"outline-style": [{ outline: [
				...P(),
				"none",
				"hidden"
			] }],
			"outline-offset": [{ "outline-offset": [
				V,
				K,
				W
			] }],
			"outline-w": [{ outline: [
				"",
				V,
				q,
				G
			] }],
			"outline-color": [{ outline: j() }],
			shadow: [{ shadow: [
				"",
				"inner",
				"none",
				u,
				Ne,
				Oe
			] }],
			"shadow-color": [{ shadow: j() }],
			"inset-shadow": [{ "inset-shadow": [
				"none",
				d,
				Ne,
				Oe
			] }],
			"inset-shadow-color": [{ "inset-shadow": j() }],
			"ring-w": [{ ring: N() }],
			"ring-w-inset": ["ring-inset"],
			"ring-color": [{ ring: j() }],
			"ring-offset-w": [{ "ring-offset": [V, G] }],
			"ring-offset-color": [{ "ring-offset": j() }],
			"inset-ring-w": [{ "inset-ring": N() }],
			"inset-ring-color": [{ "inset-ring": j() }],
			"text-shadow": [{ "text-shadow": [
				"none",
				f,
				Ne,
				Oe
			] }],
			"text-shadow-color": [{ "text-shadow": j() }],
			opacity: [{ opacity: [
				V,
				K,
				W
			] }],
			"mix-blend": [{ "mix-blend": [
				...le(),
				"plus-darker",
				"plus-lighter"
			] }],
			"bg-blend": [{ "bg-blend": le() }],
			"mask-clip": [{ "mask-clip": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }, "mask-no-clip"],
			"mask-composite": [{ mask: [
				"add",
				"subtract",
				"intersect",
				"exclude"
			] }],
			"mask-image-linear-pos": [{ "mask-linear": [V] }],
			"mask-image-linear-from-pos": [{ "mask-linear-from": I() }],
			"mask-image-linear-to-pos": [{ "mask-linear-to": I() }],
			"mask-image-linear-from-color": [{ "mask-linear-from": j() }],
			"mask-image-linear-to-color": [{ "mask-linear-to": j() }],
			"mask-image-t-from-pos": [{ "mask-t-from": I() }],
			"mask-image-t-to-pos": [{ "mask-t-to": I() }],
			"mask-image-t-from-color": [{ "mask-t-from": j() }],
			"mask-image-t-to-color": [{ "mask-t-to": j() }],
			"mask-image-r-from-pos": [{ "mask-r-from": I() }],
			"mask-image-r-to-pos": [{ "mask-r-to": I() }],
			"mask-image-r-from-color": [{ "mask-r-from": j() }],
			"mask-image-r-to-color": [{ "mask-r-to": j() }],
			"mask-image-b-from-pos": [{ "mask-b-from": I() }],
			"mask-image-b-to-pos": [{ "mask-b-to": I() }],
			"mask-image-b-from-color": [{ "mask-b-from": j() }],
			"mask-image-b-to-color": [{ "mask-b-to": j() }],
			"mask-image-l-from-pos": [{ "mask-l-from": I() }],
			"mask-image-l-to-pos": [{ "mask-l-to": I() }],
			"mask-image-l-from-color": [{ "mask-l-from": j() }],
			"mask-image-l-to-color": [{ "mask-l-to": j() }],
			"mask-image-x-from-pos": [{ "mask-x-from": I() }],
			"mask-image-x-to-pos": [{ "mask-x-to": I() }],
			"mask-image-x-from-color": [{ "mask-x-from": j() }],
			"mask-image-x-to-color": [{ "mask-x-to": j() }],
			"mask-image-y-from-pos": [{ "mask-y-from": I() }],
			"mask-image-y-to-pos": [{ "mask-y-to": I() }],
			"mask-image-y-from-color": [{ "mask-y-from": j() }],
			"mask-image-y-to-color": [{ "mask-y-to": j() }],
			"mask-image-radial": [{ "mask-radial": [K, W] }],
			"mask-image-radial-from-pos": [{ "mask-radial-from": I() }],
			"mask-image-radial-to-pos": [{ "mask-radial-to": I() }],
			"mask-image-radial-from-color": [{ "mask-radial-from": j() }],
			"mask-image-radial-to-color": [{ "mask-radial-to": j() }],
			"mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
			"mask-image-radial-size": [{ "mask-radial": [{
				closest: ["side", "corner"],
				farthest: ["side", "corner"]
			}] }],
			"mask-image-radial-pos": [{ "mask-radial-at": b() }],
			"mask-image-conic-pos": [{ "mask-conic": [V] }],
			"mask-image-conic-from-pos": [{ "mask-conic-from": I() }],
			"mask-image-conic-to-pos": [{ "mask-conic-to": I() }],
			"mask-image-conic-from-color": [{ "mask-conic-from": j() }],
			"mask-image-conic-to-color": [{ "mask-conic-to": j() }],
			"mask-mode": [{ mask: [
				"alpha",
				"luminance",
				"match"
			] }],
			"mask-origin": [{ "mask-origin": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }],
			"mask-position": [{ mask: ae() }],
			"mask-repeat": [{ mask: oe() }],
			"mask-size": [{ mask: se() }],
			"mask-type": [{ "mask-type": ["alpha", "luminance"] }],
			"mask-image": [{ mask: [
				"none",
				K,
				W
			] }],
			filter: [{ filter: [
				"",
				"none",
				K,
				W
			] }],
			blur: [{ blur: ue() }],
			brightness: [{ brightness: [
				V,
				K,
				W
			] }],
			contrast: [{ contrast: [
				V,
				K,
				W
			] }],
			"drop-shadow": [{ "drop-shadow": [
				"",
				"none",
				p,
				Ne,
				Oe
			] }],
			"drop-shadow-color": [{ "drop-shadow": j() }],
			grayscale: [{ grayscale: [
				"",
				V,
				K,
				W
			] }],
			"hue-rotate": [{ "hue-rotate": [
				V,
				K,
				W
			] }],
			invert: [{ invert: [
				"",
				V,
				K,
				W
			] }],
			saturate: [{ saturate: [
				V,
				K,
				W
			] }],
			sepia: [{ sepia: [
				"",
				V,
				K,
				W
			] }],
			"backdrop-filter": [{ "backdrop-filter": [
				"",
				"none",
				K,
				W
			] }],
			"backdrop-blur": [{ "backdrop-blur": ue() }],
			"backdrop-brightness": [{ "backdrop-brightness": [
				V,
				K,
				W
			] }],
			"backdrop-contrast": [{ "backdrop-contrast": [
				V,
				K,
				W
			] }],
			"backdrop-grayscale": [{ "backdrop-grayscale": [
				"",
				V,
				K,
				W
			] }],
			"backdrop-hue-rotate": [{ "backdrop-hue-rotate": [
				V,
				K,
				W
			] }],
			"backdrop-invert": [{ "backdrop-invert": [
				"",
				V,
				K,
				W
			] }],
			"backdrop-opacity": [{ "backdrop-opacity": [
				V,
				K,
				W
			] }],
			"backdrop-saturate": [{ "backdrop-saturate": [
				V,
				K,
				W
			] }],
			"backdrop-sepia": [{ "backdrop-sepia": [
				"",
				V,
				K,
				W
			] }],
			"border-collapse": [{ border: ["collapse", "separate"] }],
			"border-spacing": [{ "border-spacing": w() }],
			"border-spacing-x": [{ "border-spacing-x": w() }],
			"border-spacing-y": [{ "border-spacing-y": w() }],
			"table-layout": [{ table: ["auto", "fixed"] }],
			caption: [{ caption: ["top", "bottom"] }],
			transition: [{ transition: [
				"",
				"all",
				"colors",
				"opacity",
				"shadow",
				"transform",
				"none",
				K,
				W
			] }],
			"transition-behavior": [{ transition: ["normal", "discrete"] }],
			duration: [{ duration: [
				V,
				"initial",
				K,
				W
			] }],
			ease: [{ ease: [
				"linear",
				"initial",
				_,
				K,
				W
			] }],
			delay: [{ delay: [
				V,
				K,
				W
			] }],
			animate: [{ animate: [
				"none",
				v,
				K,
				W
			] }],
			backface: [{ backface: ["hidden", "visible"] }],
			perspective: [{ perspective: [
				h,
				K,
				W
			] }],
			"perspective-origin": [{ "perspective-origin": x() }],
			rotate: [{ rotate: L() }],
			"rotate-x": [{ "rotate-x": L() }],
			"rotate-y": [{ "rotate-y": L() }],
			"rotate-z": [{ "rotate-z": L() }],
			scale: [{ scale: R() }],
			"scale-x": [{ "scale-x": R() }],
			"scale-y": [{ "scale-y": R() }],
			"scale-z": [{ "scale-z": R() }],
			"scale-3d": ["scale-3d"],
			skew: [{ skew: de() }],
			"skew-x": [{ "skew-x": de() }],
			"skew-y": [{ "skew-y": de() }],
			transform: [{ transform: [
				K,
				W,
				"",
				"none",
				"gpu",
				"cpu"
			] }],
			"transform-origin": [{ origin: x() }],
			"transform-style": [{ transform: ["3d", "flat"] }],
			translate: [{ translate: z() }],
			"translate-x": [{ "translate-x": z() }],
			"translate-y": [{ "translate-y": z() }],
			"translate-z": [{ "translate-z": z() }],
			"translate-none": ["translate-none"],
			zoom: [{ zoom: [
				H,
				K,
				W
			] }],
			accent: [{ accent: j() }],
			appearance: [{ appearance: ["none", "auto"] }],
			"caret-color": [{ caret: j() }],
			"color-scheme": [{ scheme: [
				"normal",
				"dark",
				"light",
				"light-dark",
				"only-dark",
				"only-light"
			] }],
			cursor: [{ cursor: [
				"auto",
				"default",
				"pointer",
				"wait",
				"text",
				"move",
				"help",
				"not-allowed",
				"none",
				"context-menu",
				"progress",
				"cell",
				"crosshair",
				"vertical-text",
				"alias",
				"copy",
				"no-drop",
				"grab",
				"grabbing",
				"all-scroll",
				"col-resize",
				"row-resize",
				"n-resize",
				"e-resize",
				"s-resize",
				"w-resize",
				"ne-resize",
				"nw-resize",
				"se-resize",
				"sw-resize",
				"ew-resize",
				"ns-resize",
				"nesw-resize",
				"nwse-resize",
				"zoom-in",
				"zoom-out",
				K,
				W
			] }],
			"field-sizing": [{ "field-sizing": ["fixed", "content"] }],
			"pointer-events": [{ "pointer-events": ["auto", "none"] }],
			resize: [{ resize: [
				"none",
				"",
				"y",
				"x"
			] }],
			"scroll-behavior": [{ scroll: ["auto", "smooth"] }],
			"scrollbar-thumb-color": [{ "scrollbar-thumb": j() }],
			"scrollbar-track-color": [{ "scrollbar-track": j() }],
			"scrollbar-gutter": [{ "scrollbar-gutter": [
				"auto",
				"stable",
				"both"
			] }],
			"scrollbar-w": [{ scrollbar: [
				"auto",
				"thin",
				"none"
			] }],
			"scroll-m": [{ "scroll-m": w() }],
			"scroll-mx": [{ "scroll-mx": w() }],
			"scroll-my": [{ "scroll-my": w() }],
			"scroll-ms": [{ "scroll-ms": w() }],
			"scroll-me": [{ "scroll-me": w() }],
			"scroll-mbs": [{ "scroll-mbs": w() }],
			"scroll-mbe": [{ "scroll-mbe": w() }],
			"scroll-mt": [{ "scroll-mt": w() }],
			"scroll-mr": [{ "scroll-mr": w() }],
			"scroll-mb": [{ "scroll-mb": w() }],
			"scroll-ml": [{ "scroll-ml": w() }],
			"scroll-p": [{ "scroll-p": w() }],
			"scroll-px": [{ "scroll-px": w() }],
			"scroll-py": [{ "scroll-py": w() }],
			"scroll-ps": [{ "scroll-ps": w() }],
			"scroll-pe": [{ "scroll-pe": w() }],
			"scroll-pbs": [{ "scroll-pbs": w() }],
			"scroll-pbe": [{ "scroll-pbe": w() }],
			"scroll-pt": [{ "scroll-pt": w() }],
			"scroll-pr": [{ "scroll-pr": w() }],
			"scroll-pb": [{ "scroll-pb": w() }],
			"scroll-pl": [{ "scroll-pl": w() }],
			"snap-align": [{ snap: [
				"start",
				"end",
				"center",
				"align-none"
			] }],
			"snap-stop": [{ snap: ["normal", "always"] }],
			"snap-type": [{ snap: [
				"none",
				"x",
				"y",
				"both"
			] }],
			"snap-strictness": [{ snap: ["mandatory", "proximity"] }],
			touch: [{ touch: [
				"auto",
				"none",
				"manipulation"
			] }],
			"touch-x": [{ "touch-pan": [
				"x",
				"left",
				"right"
			] }],
			"touch-y": [{ "touch-pan": [
				"y",
				"up",
				"down"
			] }],
			"touch-pz": ["touch-pinch-zoom"],
			select: [{ select: [
				"none",
				"text",
				"all",
				"auto"
			] }],
			"will-change": [{ "will-change": [
				"auto",
				"scroll",
				"contents",
				"transform",
				K,
				W
			] }],
			fill: [{ fill: ["none", ...j()] }],
			"stroke-w": [{ stroke: [
				V,
				q,
				G,
				Ce
			] }],
			stroke: [{ stroke: ["none", ...j()] }],
			"forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }]
		},
		conflictingClassGroups: {
			"container-named": ["container-type"],
			overflow: ["overflow-x", "overflow-y"],
			overscroll: ["overscroll-x", "overscroll-y"],
			inset: [
				"inset-x",
				"inset-y",
				"inset-bs",
				"inset-be",
				"start",
				"end",
				"top",
				"right",
				"bottom",
				"left"
			],
			"inset-x": [
				"start",
				"end",
				"right",
				"left"
			],
			"inset-y": [
				"inset-bs",
				"inset-be",
				"top",
				"bottom"
			],
			flex: [
				"basis",
				"grow",
				"shrink"
			],
			gap: ["gap-x", "gap-y"],
			p: [
				"px",
				"py",
				"ps",
				"pe",
				"pbs",
				"pbe",
				"pt",
				"pr",
				"pb",
				"pl"
			],
			px: [
				"ps",
				"pe",
				"pr",
				"pl"
			],
			py: [
				"pbs",
				"pbe",
				"pt",
				"pb"
			],
			m: [
				"mx",
				"my",
				"ms",
				"me",
				"mbs",
				"mbe",
				"mt",
				"mr",
				"mb",
				"ml"
			],
			mx: [
				"ms",
				"me",
				"mr",
				"ml"
			],
			my: [
				"mbs",
				"mbe",
				"mt",
				"mb"
			],
			size: ["w", "h"],
			"font-size": ["leading"],
			"fvn-normal": [
				"fvn-ordinal",
				"fvn-slashed-zero",
				"fvn-figure",
				"fvn-spacing",
				"fvn-fraction"
			],
			"fvn-ordinal": ["fvn-normal"],
			"fvn-slashed-zero": ["fvn-normal"],
			"fvn-figure": ["fvn-normal"],
			"fvn-spacing": ["fvn-normal"],
			"fvn-fraction": ["fvn-normal"],
			"line-clamp": ["display", "overflow"],
			rounded: [
				"rounded-s",
				"rounded-e",
				"rounded-t",
				"rounded-r",
				"rounded-b",
				"rounded-l",
				"rounded-ss",
				"rounded-se",
				"rounded-ee",
				"rounded-es",
				"rounded-tl",
				"rounded-tr",
				"rounded-br",
				"rounded-bl"
			],
			"rounded-s": ["rounded-ss", "rounded-es"],
			"rounded-e": ["rounded-se", "rounded-ee"],
			"rounded-t": ["rounded-tl", "rounded-tr"],
			"rounded-r": ["rounded-tr", "rounded-br"],
			"rounded-b": ["rounded-br", "rounded-bl"],
			"rounded-l": ["rounded-tl", "rounded-bl"],
			"border-spacing": ["border-spacing-x", "border-spacing-y"],
			"border-w": [
				"border-w-x",
				"border-w-y",
				"border-w-s",
				"border-w-e",
				"border-w-bs",
				"border-w-be",
				"border-w-t",
				"border-w-r",
				"border-w-b",
				"border-w-l"
			],
			"border-w-x": [
				"border-w-s",
				"border-w-e",
				"border-w-r",
				"border-w-l"
			],
			"border-w-y": [
				"border-w-bs",
				"border-w-be",
				"border-w-t",
				"border-w-b"
			],
			"border-color": [
				"border-color-x",
				"border-color-y",
				"border-color-s",
				"border-color-e",
				"border-color-bs",
				"border-color-be",
				"border-color-t",
				"border-color-r",
				"border-color-b",
				"border-color-l"
			],
			"border-color-x": [
				"border-color-s",
				"border-color-e",
				"border-color-r",
				"border-color-l"
			],
			"border-color-y": [
				"border-color-bs",
				"border-color-be",
				"border-color-t",
				"border-color-b"
			],
			translate: [
				"translate-x",
				"translate-y",
				"translate-none"
			],
			"translate-none": [
				"translate",
				"translate-x",
				"translate-y",
				"translate-z"
			],
			"scroll-m": [
				"scroll-mx",
				"scroll-my",
				"scroll-ms",
				"scroll-me",
				"scroll-mbs",
				"scroll-mbe",
				"scroll-mt",
				"scroll-mr",
				"scroll-mb",
				"scroll-ml"
			],
			"scroll-mx": [
				"scroll-ms",
				"scroll-me",
				"scroll-mr",
				"scroll-ml"
			],
			"scroll-my": [
				"scroll-mbs",
				"scroll-mbe",
				"scroll-mt",
				"scroll-mb"
			],
			"scroll-p": [
				"scroll-px",
				"scroll-py",
				"scroll-ps",
				"scroll-pe",
				"scroll-pbs",
				"scroll-pbe",
				"scroll-pt",
				"scroll-pr",
				"scroll-pb",
				"scroll-pl"
			],
			"scroll-px": [
				"scroll-ps",
				"scroll-pe",
				"scroll-pr",
				"scroll-pl"
			],
			"scroll-py": [
				"scroll-pbs",
				"scroll-pbe",
				"scroll-pt",
				"scroll-pb"
			],
			touch: [
				"touch-x",
				"touch-y",
				"touch-pz"
			],
			"touch-x": ["touch"],
			"touch-y": ["touch"],
			"touch-pz": ["touch"]
		},
		conflictingClassGroupModifiers: { "font-size": ["leading"] },
		postfixLookupClassGroups: ["container-type"],
		orderSensitiveModifiers: [
			"*",
			"**",
			"after",
			"backdrop",
			"before",
			"details-content",
			"file",
			"first-letter",
			"first-line",
			"marker",
			"placeholder",
			"selection"
		]
	};
});
//#endregion
//#region src/lib/utils.js
function X(...e) {
	return Ue(d(e));
}
//#endregion
//#region src/context/ThemeContext.jsx
var Z = [
	{
		id: "linear",
		name: "Linear Kinetic",
		description: "Electric Violet & Obsidian Void",
		primaryHex: "#7C3AED",
		bgHex: "#090A0F",
		accentHex: "#06B6D4"
	},
	{
		id: "azure",
		name: "Azure JDLC",
		description: "Azure Blue & Midnight Navy",
		primaryHex: "#0078D4",
		bgHex: "#080C14",
		accentHex: "#60A5FA"
	},
	{
		id: "emerald",
		name: "Pulse Emerald",
		description: "Luminous Mint & Deep Slate",
		primaryHex: "#10B981",
		bgHex: "#0B0E11",
		accentHex: "#14B8A6"
	},
	{
		id: "amber",
		name: "Solar Amber",
		description: "Solar Ember & Volcanic Graphite",
		primaryHex: "#F59E0B",
		bgHex: "#0C0C0E",
		accentHex: "#FBBF24"
	},
	{
		id: "frost",
		name: "Nordic Frost",
		description: "Crisp Ice Canvas & Precision Electric Cobalt",
		primaryHex: "#2563EB",
		bgHex: "#F8FAFC",
		accentHex: "#0284C7",
		isLight: !0
	},
	{
		id: "sandstone",
		name: "Editorial Sandstone",
		description: "Warm Alabaster Canvas & Burnt Terracotta",
		primaryHex: "#C2410C",
		bgHex: "#FBF9F5",
		accentHex: "#0F766E",
		isLight: !0
	}
], We = t({
	theme: "linear",
	setTheme: () => {},
	currentThemeConfig: Z[0],
	availableThemes: Z
});
function Ge({ children: e, defaultTheme: t = "linear", storageKey: n = "jdlc_theme" }) {
	let [r, a] = s(() => {
		try {
			return typeof window < "u" && localStorage.getItem(n) || t;
		} catch {
			return t;
		}
	});
	i(() => {
		try {
			typeof document < "u" && (document.documentElement.setAttribute("data-theme", r), localStorage.setItem(n, r));
		} catch {}
	}, [r, n]);
	let o = Z.find((e) => e.id === r) || Z[0];
	return /* @__PURE__ */ c(We.Provider, {
		value: {
			theme: r,
			setTheme: a,
			currentThemeConfig: o,
			availableThemes: Z
		},
		children: e
	});
}
function Ke() {
	return r(We) || {
		theme: "linear",
		setTheme: () => {},
		currentThemeConfig: Z[0],
		availableThemes: Z
	};
}
//#endregion
//#region src/components/Button.jsx
function qe({ children: e, className: t, variant: n = "default", size: r = "md", disabled: i = !1, isLoading: a = !1, onClick: o, type: s = "button", icon: u, ...d }) {
	return /* @__PURE__ */ l("button", {
		type: s,
		disabled: i || a,
		onClick: o,
		className: X("inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-focus)] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none", {
			default: "bg-[var(--color-primary)] text-[var(--color-primary-content)] hover:bg-[var(--color-primary-hover)] shadow-sm hover:shadow-[0_0_15px_rgba(124,58,237,0.35)]",
			primary: "bg-[var(--color-primary)] text-[var(--color-primary-content)] hover:bg-[var(--color-primary-hover)] shadow-sm hover:shadow-[0_0_15px_rgba(124,58,237,0.35)]",
			secondary: "bg-[var(--bg-elevated)] text-[var(--text-main)] hover:bg-[var(--bg-hover)] border border-[var(--border-subtle)] hover:border-[var(--border-medium)]",
			outline: "bg-transparent text-[var(--text-main)] hover:bg-[var(--bg-subtle)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)]",
			ghost: "bg-transparent text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-hover)]",
			danger: "bg-rose-600/20 text-rose-300 border border-rose-500/30 hover:bg-rose-600 hover:text-white",
			error: "bg-rose-600/20 text-rose-300 border border-rose-500/30 hover:bg-rose-600 hover:text-white",
			warning: "bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500 hover:text-slate-950",
			success: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500 hover:text-white",
			info: "bg-sky-500/20 text-sky-300 border border-sky-500/30 hover:bg-sky-500 hover:text-white",
			accent: "bg-[var(--color-accent)] text-[var(--color-accent-content)] font-semibold hover:opacity-90"
		}[n], {
			xs: "text-[11px] px-2 py-1 gap-1",
			sm: "text-xs px-2.5 py-1.5 gap-1.5",
			md: "text-sm px-3.5 py-2 gap-2",
			lg: "text-base px-5 py-2.5 gap-2.5",
			icon: "p-2 aspect-square"
		}[r], t),
		...d,
		children: [a ? /* @__PURE__ */ l("svg", {
			className: "animate-spin -ml-0.5 mr-1.5 h-4 w-4 text-current",
			xmlns: "http://www.w3.org/2000/svg",
			fill: "none",
			viewBox: "0 0 24 24",
			children: [/* @__PURE__ */ c("circle", {
				className: "opacity-25",
				cx: "12",
				cy: "12",
				r: "10",
				stroke: "currentColor",
				strokeWidth: "4"
			}), /* @__PURE__ */ c("path", {
				className: "opacity-75",
				fill: "currentColor",
				d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
			})]
		}) : u && /* @__PURE__ */ c(u, { className: "w-4 h-4 shrink-0" }), e]
	});
}
//#endregion
//#region src/components/Card.jsx
function Je({ children: e, className: t, hover: n = !0, ...r }) {
	return /* @__PURE__ */ c("div", {
		className: X("bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-4 shadow-sm transition-all duration-200", n && "hover:border-[var(--border-medium)] hover:shadow-md hover:bg-[var(--bg-elevated)]", t),
		...r,
		children: e
	});
}
function Ye({ children: e, className: t, ...n }) {
	return /* @__PURE__ */ c("div", {
		className: X("flex items-center justify-between gap-2 mb-3", t),
		...n,
		children: e
	});
}
function Xe({ children: e, className: t, ...n }) {
	return /* @__PURE__ */ c("h3", {
		className: X("font-semibold text-[var(--text-main)] text-sm tracking-tight", t),
		...n,
		children: e
	});
}
function Ze({ children: e, className: t, ...n }) {
	return /* @__PURE__ */ c("p", {
		className: X("text-xs text-[var(--text-dim)] mt-0.5", t),
		...n,
		children: e
	});
}
function Qe({ children: e, className: t, ...n }) {
	return /* @__PURE__ */ c("div", {
		className: X("text-sm text-[var(--text-muted)]", t),
		...n,
		children: e
	});
}
function $e({ children: e, className: t, ...n }) {
	return /* @__PURE__ */ c("div", {
		className: X("flex items-center justify-end gap-2 mt-4 pt-3 border-t border-[var(--border-subtle)]", t),
		...n,
		children: e
	});
}
//#endregion
//#region src/components/Badge.jsx
function Q({ children: e, className: t, variant: n = "default", size: r = "md", dot: i = !1, ...a }) {
	return /* @__PURE__ */ l("span", {
		className: X("inline-flex items-center font-medium rounded-md tracking-wide select-none", {
			default: "bg-[var(--bg-elevated)] text-[var(--text-main)] border border-[var(--border-subtle)]",
			primary: "bg-[var(--color-primary)]/15 text-[var(--color-primary)] border border-[var(--color-primary)]/30 font-semibold",
			accent: "bg-[var(--color-accent)]/15 text-[var(--color-accent)] border border-[var(--color-accent)]/30 font-semibold",
			success: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-semibold",
			warning: "bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30 font-semibold",
			danger: "bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30 font-semibold",
			error: "bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30 font-semibold",
			info: "bg-sky-500/15 text-sky-700 dark:text-sky-300 border border-sky-500/30 font-semibold",
			neutral: "bg-[var(--bg-subtle)] text-[var(--text-muted)] border border-[var(--border-subtle)] font-medium",
			subtle: "bg-[var(--bg-subtle)] text-[var(--text-muted)] border border-[var(--border-subtle)] font-semibold"
		}[n], {
			xs: "text-[9px] px-1.5 py-0.25 gap-0.5",
			sm: "text-[10px] px-1.5 py-0.5 gap-1",
			md: "text-xs px-2 py-0.5 gap-1.5",
			lg: "text-sm px-2.5 py-1 gap-2"
		}[r], t),
		...a,
		children: [i && /* @__PURE__ */ c("span", { className: "w-1.5 h-1.5 rounded-full bg-current shrink-0 animate-pulse" }), e]
	});
}
//#endregion
//#region src/components/Input.jsx
function et({ className: e, type: t = "text", label: n, id: r, error: i, helperText: a, icon: o, ...s }) {
	let u = r || (n ? `input-${n.toLowerCase().replace(/[^a-z0-9]/g, "-")}` : void 0);
	return /* @__PURE__ */ l("div", {
		className: "w-full space-y-1.5",
		children: [
			n && /* @__PURE__ */ c("label", {
				htmlFor: u,
				className: "block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider",
				children: n
			}),
			/* @__PURE__ */ l("div", {
				className: "relative flex items-center",
				children: [o && /* @__PURE__ */ c("div", {
					className: "absolute left-3 pointer-events-none text-[var(--text-dim)]",
					children: /* @__PURE__ */ c(o, { className: "w-4 h-4" })
				}), /* @__PURE__ */ c("input", {
					id: u,
					type: t,
					className: X("w-full bg-[var(--bg-subtle)] text-[var(--text-main)] text-sm rounded-lg border border-[var(--border-subtle)] px-3 py-2 transition-all duration-150", "focus:outline-none focus:border-[var(--border-strong)] focus:ring-2 focus:ring-[var(--ring-focus)]", "placeholder:text-[var(--text-dim)] disabled:opacity-50 disabled:cursor-not-allowed", o && "pl-9", i && "border-rose-500 focus:ring-rose-500/30", e),
					...s
				})]
			}),
			i && /* @__PURE__ */ c("p", {
				className: "text-xs text-rose-400 mt-1",
				children: i
			}),
			a && !i && /* @__PURE__ */ c("p", {
				className: "text-xs text-[var(--text-dim)] mt-1",
				children: a
			})
		]
	});
}
function tt({ className: e, label: t, id: n, error: r, helperText: i, rows: a = 3, ...o }) {
	let s = n || (t ? `textarea-${t.toLowerCase().replace(/[^a-z0-9]/g, "-")}` : void 0);
	return /* @__PURE__ */ l("div", {
		className: "w-full space-y-1.5",
		children: [
			t && /* @__PURE__ */ c("label", {
				htmlFor: s,
				className: "block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider",
				children: t
			}),
			/* @__PURE__ */ c("textarea", {
				id: s,
				rows: a,
				className: X("w-full bg-[var(--bg-subtle)] text-[var(--text-main)] text-sm rounded-lg border border-[var(--border-subtle)] p-3 transition-all duration-150", "focus:outline-none focus:border-[var(--border-strong)] focus:ring-2 focus:ring-[var(--ring-focus)]", "placeholder:text-[var(--text-dim)] disabled:opacity-50 disabled:cursor-not-allowed resize-none", r && "border-rose-500 focus:ring-rose-500/30", e),
				...o
			}),
			r && /* @__PURE__ */ c("p", {
				className: "text-xs text-rose-400 mt-1",
				children: r
			}),
			i && !r && /* @__PURE__ */ c("p", {
				className: "text-xs text-[var(--text-dim)] mt-1",
				children: i
			})
		]
	});
}
function nt({ className: e, label: t, id: n, error: r, helperText: i, children: a, icon: o, ...s }) {
	let u = n || (t ? `select-${t.toLowerCase().replace(/[^a-z0-9]/g, "-")}` : void 0);
	return /* @__PURE__ */ l("div", {
		className: "w-full space-y-1.5",
		children: [
			t && /* @__PURE__ */ c("label", {
				htmlFor: u,
				className: "block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider",
				children: t
			}),
			/* @__PURE__ */ l("div", {
				className: "relative flex items-center",
				children: [o && /* @__PURE__ */ c("div", {
					className: "absolute left-3 pointer-events-none text-[var(--text-dim)]",
					children: /* @__PURE__ */ c(o, { className: "w-4 h-4" })
				}), /* @__PURE__ */ c("select", {
					id: u,
					className: X("w-full bg-[var(--bg-subtle)] text-[var(--text-main)] text-sm rounded-lg border border-[var(--border-subtle)] px-3 py-2 transition-all duration-150 cursor-pointer", "focus:outline-none focus:border-[var(--border-strong)] focus:ring-2 focus:ring-[var(--ring-focus)]", o && "pl-9", r && "border-rose-500 focus:ring-rose-500/30", e),
					...s,
					children: a
				})]
			}),
			r && /* @__PURE__ */ c("p", {
				className: "text-xs text-rose-400 mt-1",
				children: r
			}),
			i && !r && /* @__PURE__ */ c("p", {
				className: "text-xs text-[var(--text-dim)] mt-1",
				children: i
			})
		]
	});
}
//#endregion
//#region src/components/Dialog.jsx
function rt({ isOpen: e, onClose: t, title: n, description: r, subtitle: a, icon: o, headerAction: s, ariaLabel: u, children: d, maxWidth: f = "max-w-lg", className: p }) {
	if (i(() => {
		let n = (e) => {
			e.key === "Escape" && t?.();
		};
		return e && (document.body.style.overflow = "hidden", window.addEventListener("keydown", n)), () => {
			document.body.style.overflow = "unset", window.removeEventListener("keydown", n);
		};
	}, [e, t]), !e) return null;
	let m = r || a;
	return /* @__PURE__ */ l("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200",
		role: "dialog",
		"aria-modal": "true",
		"aria-label": u || n,
		children: [/* @__PURE__ */ c("div", {
			className: "fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity",
			onClick: t
		}), /* @__PURE__ */ l("div", {
			className: X("relative w-full bg-[var(--bg-surface)] border border-[var(--border-medium)] rounded-2xl shadow-2xl z-10 overflow-hidden flex flex-col max-h-[92vh]", f, p),
			onClick: (e) => e.stopPropagation(),
			children: [(n || m || o || s || t) && /* @__PURE__ */ l("div", {
				className: "flex items-start justify-between p-4 sm:p-5 border-b border-[var(--border-subtle)] bg-[var(--bg-subtle)]/60 shrink-0",
				children: [/* @__PURE__ */ l("div", {
					className: "flex items-center gap-3 pr-4",
					children: [o && /* @__PURE__ */ c("div", {
						className: "p-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--color-primary-glow)] shrink-0",
						children: o
					}), /* @__PURE__ */ l("div", { children: [n && /* @__PURE__ */ c("h2", {
						className: "text-base sm:text-lg font-bold text-slate-100 tracking-tight font-[var(--font-heading)] leading-tight",
						children: n
					}), m && /* @__PURE__ */ c("p", {
						className: "text-xs text-slate-400 mt-0.5",
						children: m
					})] })]
				}), /* @__PURE__ */ l("div", {
					className: "flex items-center gap-2 shrink-0",
					children: [s, t && /* @__PURE__ */ c("button", {
						type: "button",
						onClick: t,
						className: "p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[var(--bg-hover)] transition-colors cursor-pointer",
						"aria-label": "Close dialog",
						children: /* @__PURE__ */ c("svg", {
							className: "w-5 h-5",
							fill: "none",
							viewBox: "0 0 24 24",
							stroke: "currentColor",
							children: /* @__PURE__ */ c("path", {
								strokeLinecap: "round",
								strokeLinejoin: "round",
								strokeWidth: 2,
								d: "M6 18L18 6M6 6l12 12"
							})
						})
					})]
				})]
			}), /* @__PURE__ */ c("div", {
				className: "p-4 sm:p-6 overflow-y-auto space-y-4",
				children: d
			})]
		})]
	});
}
//#endregion
//#region src/components/Dropdown.jsx
function it({ trigger: e, items: t = [], align: n = "right", className: r }) {
	let [a, u] = s(!1), d = o(null);
	return i(() => {
		function e(e) {
			d.current && !d.current.contains(e.target) && u(!1);
		}
		return a && document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [a]), /* @__PURE__ */ l("div", {
		className: "relative inline-block text-left",
		ref: d,
		onClick: (e) => e.stopPropagation(),
		children: [/* @__PURE__ */ c("div", {
			onClick: (e) => {
				e.preventDefault(), e.stopPropagation(), u((e) => !e);
			},
			className: "cursor-pointer inline-flex",
			children: e
		}), a && /* @__PURE__ */ c("div", {
			className: X("absolute z-50 mt-1.5 w-48 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-medium)] p-1.5 shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-150", n === "right" ? "right-0" : "left-0", r),
			children: t.map((e, t) => {
				if (e.divider) return /* @__PURE__ */ c("div", { className: "my-1 border-t border-[var(--border-subtle)]" }, t);
				let n = e.icon;
				return /* @__PURE__ */ l("button", {
					type: "button",
					onClick: (t) => {
						t.preventDefault(), t.stopPropagation(), u(!1), e.onClick && e.onClick();
					},
					className: X("flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-hover)] hover:text-[var(--text-main)] cursor-pointer", e.danger && "text-rose-400 hover:bg-rose-500/15 hover:text-rose-300", e.active && "bg-[var(--bg-elevated)] text-[var(--color-primary-glow)] font-semibold"),
					children: [
						n && /* @__PURE__ */ c(n, { className: "w-3.5 h-3.5 shrink-0" }),
						/* @__PURE__ */ c("span", {
							className: "flex-1 text-left",
							children: e.label
						}),
						e.shortcut && /* @__PURE__ */ c("span", {
							className: "text-[10px] text-slate-500 font-mono",
							children: e.shortcut
						})
					]
				}, t);
			})
		})]
	});
}
//#endregion
//#region src/components/Tabs.jsx
function at({ tabs: e = [], activeTab: t, onChange: n, className: r }) {
	return /* @__PURE__ */ c("div", {
		className: X("inline-flex items-center p-1 bg-[var(--bg-subtle)] border border-[var(--border-subtle)] rounded-lg", r),
		children: e.map((e) => {
			let r = t === e.id, i = e.icon;
			return /* @__PURE__ */ l("button", {
				type: "button",
				onClick: () => n(e.id),
				className: X("flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium rounded-md transition-all duration-150 cursor-pointer select-none", r ? "bg-[var(--bg-elevated)] text-[var(--text-main)] shadow-sm border border-[var(--border-medium)]" : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-hover)]/60 font-medium"),
				children: [
					i && /* @__PURE__ */ c(i, { className: "w-3.5 h-3.5 shrink-0" }),
					/* @__PURE__ */ c("span", {
						className: X(e.hideLabelOnMobile && "hidden sm:inline"),
						children: e.label
					}),
					e.count !== void 0 && /* @__PURE__ */ c("span", {
						className: X("px-1.5 py-0.5 rounded text-[10px] font-mono", r ? "bg-[var(--color-primary)]/20 text-[var(--color-primary-glow)] font-bold" : "bg-[var(--bg-elevated)] text-[var(--text-dim)] border border-[var(--border-subtle)]"),
						children: e.count
					})
				]
			}, e.id);
		})
	});
}
//#endregion
//#region src/components/ThemeSelector.jsx
function ot({ className: e, align: t = "right" }) {
	let { theme: n, setTheme: r, availableThemes: i, currentThemeConfig: a } = Ke(), o = i.map((e) => ({
		label: e.name,
		active: e.id === n,
		onClick: () => r(e.id),
		icon: () => /* @__PURE__ */ c("span", {
			className: "w-3 h-3 rounded-full shrink-0 border border-white/20",
			style: { backgroundColor: e.primaryHex }
		})
	})), s = /* @__PURE__ */ l("button", {
		type: "button",
		className: X("flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[var(--bg-subtle)] hover:bg-[var(--bg-hover)] border border-[var(--border-subtle)] text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors cursor-pointer", e),
		children: [
			/* @__PURE__ */ c("span", {
				className: "w-2.5 h-2.5 rounded-full shadow-sm",
				style: { backgroundColor: a.primaryHex }
			}),
			/* @__PURE__ */ c("span", {
				className: "hidden sm:inline font-semibold",
				children: a.name
			}),
			/* @__PURE__ */ c("svg", {
				className: "w-3.5 h-3.5 text-[var(--text-dim)] ml-0.5",
				fill: "none",
				viewBox: "0 0 24 24",
				stroke: "currentColor",
				children: /* @__PURE__ */ c("path", {
					strokeLinecap: "round",
					strokeLinejoin: "round",
					strokeWidth: 2,
					d: "M19 9l-7 7-7-7"
				})
			})
		]
	});
	return /* @__PURE__ */ c(it, {
		trigger: s,
		items: o,
		align: t
	});
}
//#endregion
//#region src/lib/suiteUtils.js
var st = [
	{
		id: "taskflow",
		name: "TaskFlow",
		description: "Tasks, Kanban & Sprint Tracker",
		badge: "Productivity",
		color: "#7C3AED"
	},
	{
		id: "budgetcast",
		name: "BudgetCast",
		description: "Cash Flow & Multi-Currency Forecast",
		badge: "Finance",
		color: "#06B6D4"
	},
	{
		id: "tripplanner",
		name: "TripPlanner",
		description: "Roadtrip & Travel Itineraries",
		badge: "Travel",
		color: "#10B981"
	}
];
function $(e) {
	if (typeof window > "u") return "#";
	try {
		let t = `VITE_${e.toUpperCase()}_URL`;
		if (typeof process < "u" && process.env && process.env[t]) return process.env[t];
	} catch {}
	let t = window.location.hostname;
	return t === "localhost" || t === "127.0.0.1" || t.endsWith(".local") || t === "0.0.0.0" ? `http://localhost:${{
		taskflow: 5173,
		budgetcast: 5174,
		tripplanner: 5175,
		main: 5176
	}[e] || 5173}` : t.includes("jdlc.se") ? e === "main" ? "https://jdlc.se" : `https://${e}.jdlc.se` : `https://${e}.${t}`;
}
//#endregion
//#region src/components/AppSwitcher.jsx
function ct({ currentApp: e = "taskflow", className: t, align: n = "left" }) {
	let [r, a] = s(!1), u = o(null);
	i(() => {
		function e(e) {
			u.current && !u.current.contains(e.target) && a(!1);
		}
		return r && document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [r]);
	let d = typeof window < "u" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.hostname.endsWith(".local")), f = (e) => {
		switch (e) {
			case "taskflow": return /* @__PURE__ */ c("svg", {
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2.5",
				className: "w-4 h-4",
				children: /* @__PURE__ */ c("path", {
					strokeLinecap: "round",
					strokeLinejoin: "round",
					d: "M4.5 12.75l6 6 9-13.5"
				})
			});
			case "budgetcast": return /* @__PURE__ */ c("svg", {
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2",
				className: "w-4 h-4",
				children: /* @__PURE__ */ c("path", {
					strokeLinecap: "round",
					strokeLinejoin: "round",
					d: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
				})
			});
			default: return /* @__PURE__ */ c("svg", {
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2",
				className: "w-4 h-4",
				children: /* @__PURE__ */ c("path", {
					strokeLinecap: "round",
					strokeLinejoin: "round",
					d: "M9 6.75V15m6-6v8.25m.53 3.72a.75.75 0 01-.82.08L9 18l-5.71 2.855A.75.75 0 012.25 20.19V6.44a.75.75 0 01.42-.67l6-3a.75.75 0 01.66 0l5.71 2.855a.75.75 0 01.42.67v13.75a.75.75 0 01-.93.72z"
				})
			});
		}
	};
	return /* @__PURE__ */ l("div", {
		className: "relative inline-block text-left",
		ref: u,
		children: [/* @__PURE__ */ c("button", {
			type: "button",
			onClick: () => a((e) => !e),
			className: X("p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-elevated)] border border-transparent hover:border-[var(--border-subtle)] transition-colors cursor-pointer flex items-center justify-center shrink-0", r && "bg-[var(--bg-elevated)] text-[var(--text-main)] border-[var(--border-subtle)]", t),
			title: "JDLC Cloud Suite Apps",
			"aria-label": "JDLC Cloud Suite Apps",
			"aria-expanded": r,
			children: /* @__PURE__ */ l("svg", {
				viewBox: "0 0 20 20",
				fill: "currentColor",
				className: "w-4.5 h-4.5",
				children: [
					/* @__PURE__ */ c("circle", {
						cx: "4",
						cy: "4",
						r: "1.8"
					}),
					/* @__PURE__ */ c("circle", {
						cx: "10",
						cy: "4",
						r: "1.8"
					}),
					/* @__PURE__ */ c("circle", {
						cx: "16",
						cy: "4",
						r: "1.8"
					}),
					/* @__PURE__ */ c("circle", {
						cx: "4",
						cy: "10",
						r: "1.8"
					}),
					/* @__PURE__ */ c("circle", {
						cx: "10",
						cy: "10",
						r: "1.8"
					}),
					/* @__PURE__ */ c("circle", {
						cx: "16",
						cy: "10",
						r: "1.8"
					}),
					/* @__PURE__ */ c("circle", {
						cx: "4",
						cy: "16",
						r: "1.8"
					}),
					/* @__PURE__ */ c("circle", {
						cx: "10",
						cy: "16",
						r: "1.8"
					}),
					/* @__PURE__ */ c("circle", {
						cx: "16",
						cy: "16",
						r: "1.8"
					})
				]
			})
		}), r && /* @__PURE__ */ l("div", {
			className: X("absolute z-50 mt-2 w-72 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-medium)] p-2.5 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150", n === "right" ? "right-0" : "left-0"),
			children: [
				/* @__PURE__ */ l("div", {
					className: "flex items-center justify-between px-2.5 py-1.5 mb-1.5 border-b border-[var(--border-subtle)]",
					children: [/* @__PURE__ */ c("span", {
						className: "text-xs font-bold tracking-tight text-[var(--text-main)] font-[var(--font-heading)]",
						children: "JDLC Suite"
					}), /* @__PURE__ */ c(Q, {
						variant: d ? "subtle" : "primary",
						size: "xs",
						className: "font-mono text-[9px]",
						children: d ? "Localhost" : "Cloud"
					})]
				}),
				/* @__PURE__ */ c("div", {
					className: "space-y-1",
					children: st.map((t) => {
						let n = t.id === e, r = $(t.id);
						return /* @__PURE__ */ l("a", {
							href: n ? void 0 : r,
							onClick: (e) => {
								n && (e.preventDefault(), a(!1));
							},
							className: X("flex items-center gap-3 p-2 rounded-xl transition-all", n ? "bg-[var(--bg-elevated)] border border-[var(--border-medium)] cursor-default" : "hover:bg-[var(--bg-hover)] border border-transparent hover:border-[var(--border-subtle)] cursor-pointer text-[var(--text-muted)] hover:text-[var(--text-main)]"),
							children: [/* @__PURE__ */ c("div", {
								className: "w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0 shadow-sm",
								style: { backgroundColor: t.color },
								children: f(t.id)
							}), /* @__PURE__ */ l("div", {
								className: "flex-1 min-w-0",
								children: [/* @__PURE__ */ l("div", {
									className: "flex items-center justify-between gap-1.5",
									children: [/* @__PURE__ */ c("span", {
										className: "text-xs font-bold tracking-tight text-[var(--text-main)] font-[var(--font-heading)] truncate",
										children: t.name
									}), n ? /* @__PURE__ */ c(Q, {
										variant: "subtle",
										size: "xs",
										className: "text-[9px] py-0 px-1 font-mono",
										children: "Current"
									}) : /* @__PURE__ */ c("span", {
										className: "text-[10px] text-slate-500 font-mono",
										children: d ? `:${$(t.id).split(":").pop()}` : "open ↗"
									})]
								}), /* @__PURE__ */ c("p", {
									className: "text-[10px] text-slate-400 truncate mt-0.5",
									children: t.description
								})]
							})]
						}, t.id);
					})
				}),
				/* @__PURE__ */ l("div", {
					className: "mt-2 pt-1.5 border-t border-[var(--border-subtle)] px-2.5 flex items-center justify-between text-[10px] text-slate-400",
					children: [/* @__PURE__ */ c("span", { children: "JDLC Ecosystem" }), /* @__PURE__ */ c("a", {
						href: $("main"),
						className: "text-[var(--color-primary-glow)] hover:underline flex items-center gap-0.5",
						children: "Portal Home ↗"
					})]
				})
			]
		})]
	});
}
//#endregion
//#region src/components/Toast.jsx
var lt = t(null);
function ut({ children: e, position: t = "bottom-right" }) {
	let [r, i] = s([]), o = n((e) => {
		i((t) => t.filter((t) => t.id !== e));
	}, []), u = n(({ message: e, title: t, variant: n = "info", duration: r = 3500 }) => {
		let a = Date.now().toString() + Math.random().toString(36).substring(2, 7), s = {
			id: a,
			message: e,
			title: t,
			variant: n,
			duration: r
		};
		return i((e) => [...e, s]), r > 0 && setTimeout(() => {
			o(a);
		}, r), a;
	}, [o]), d = a(() => ({
		show: (e, t) => u({
			message: e,
			...t
		}),
		success: (e, t) => u({
			message: e,
			variant: "success",
			...t
		}),
		error: (e, t) => u({
			message: e,
			variant: "error",
			...t
		}),
		warning: (e, t) => u({
			message: e,
			variant: "warning",
			...t
		}),
		info: (e, t) => u({
			message: e,
			variant: "info",
			...t
		}),
		dismiss: o
	}), [u, o]), f = {
		"top-right": "top-4 right-4 items-end",
		"top-left": "top-4 left-4 items-start",
		"bottom-right": "bottom-4 right-4 items-end",
		"bottom-left": "bottom-4 left-4 items-start",
		"top-center": "top-4 left-1/2 -translate-x-1/2 items-center",
		"bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center"
	};
	return /* @__PURE__ */ l(lt.Provider, {
		value: d,
		children: [e, /* @__PURE__ */ c("div", {
			className: X("fixed z-50 pointer-events-none flex flex-col gap-2 p-4 max-w-sm w-full", f[t] || f["bottom-right"]),
			children: r.map((e) => /* @__PURE__ */ c(ft, {
				item: e,
				onDismiss: () => o(e.id)
			}, e.id))
		})]
	});
}
function dt() {
	return r(lt) || {
		show: (e) => console.log("[Toast]", e),
		success: (e) => console.log("[Toast Success]", e),
		error: (e) => console.error("[Toast Error]", e),
		warning: (e) => console.warn("[Toast Warning]", e),
		info: (e) => console.info("[Toast Info]", e),
		dismiss: () => {}
	};
}
function ft({ item: e, onDismiss: t }) {
	let n = {
		success: {
			border: "border-emerald-500/40",
			badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
			icon: /* @__PURE__ */ c("svg", {
				viewBox: "0 0 20 20",
				fill: "currentColor",
				className: "w-4 h-4 text-emerald-400",
				children: /* @__PURE__ */ c("path", {
					fillRule: "evenodd",
					d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
					clipRule: "evenodd"
				})
			})
		},
		error: {
			border: "border-rose-500/40",
			badge: "bg-rose-500/10 text-rose-400 border-rose-500/30",
			icon: /* @__PURE__ */ c("svg", {
				viewBox: "0 0 20 20",
				fill: "currentColor",
				className: "w-4 h-4 text-rose-400",
				children: /* @__PURE__ */ c("path", {
					fillRule: "evenodd",
					d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z",
					clipRule: "evenodd"
				})
			})
		},
		warning: {
			border: "border-amber-500/40",
			badge: "bg-amber-500/10 text-amber-400 border-amber-500/30",
			icon: /* @__PURE__ */ c("svg", {
				viewBox: "0 0 20 20",
				fill: "currentColor",
				className: "w-4 h-4 text-amber-400",
				children: /* @__PURE__ */ c("path", {
					fillRule: "evenodd",
					d: "M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z",
					clipRule: "evenodd"
				})
			})
		},
		info: {
			border: "border-[var(--color-primary-glow)]/40",
			badge: "bg-[var(--color-primary)]/10 text-[var(--color-primary-glow)] border-[var(--color-primary)]/30",
			icon: /* @__PURE__ */ c("svg", {
				viewBox: "0 0 20 20",
				fill: "currentColor",
				className: "w-4 h-4 text-[var(--color-primary-glow)]",
				children: /* @__PURE__ */ c("path", {
					fillRule: "evenodd",
					d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
					clipRule: "evenodd"
				})
			})
		}
	}, r = n[e.variant] || n.info;
	return /* @__PURE__ */ l("div", {
		role: "alert",
		className: X("pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl bg-[var(--bg-surface)]/95 border backdrop-blur-md shadow-xl text-slate-200 transition-all duration-200 animate-in fade-in slide-in-from-bottom-2", r.border),
		children: [
			/* @__PURE__ */ c("div", {
				className: X("p-1 rounded-lg border shrink-0 mt-0.5", r.badge),
				children: r.icon
			}),
			/* @__PURE__ */ l("div", {
				className: "flex-1 min-w-0 pr-2",
				children: [e.title && /* @__PURE__ */ c("h4", {
					className: "text-xs font-bold text-slate-100 font-[var(--font-heading)] leading-tight mb-0.5",
					children: e.title
				}), /* @__PURE__ */ c("p", {
					className: "text-xs text-slate-300 leading-snug break-words",
					children: e.message
				})]
			}),
			/* @__PURE__ */ c("button", {
				type: "button",
				onClick: t,
				className: "p-1 rounded-md text-slate-400 hover:text-white hover:bg-[var(--bg-hover)] transition-colors cursor-pointer shrink-0",
				"aria-label": "Close notification",
				children: /* @__PURE__ */ c("svg", {
					viewBox: "0 0 20 20",
					fill: "currentColor",
					className: "w-3.5 h-3.5",
					children: /* @__PURE__ */ c("path", { d: "M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" })
				})
			})
		]
	});
}
//#endregion
//#region src/components/CommandPalette.jsx
function pt({ isOpen: e, onClose: t, placeholder: n = "Type a command or search...", sections: r = [], currentApp: u = "taskflow", enableSuiteShortcuts: d = !0 }) {
	let [f, p] = s(""), [m, h] = s(0), g = o(null), _ = o([]);
	i(() => {
		e && (p(""), h(0), setTimeout(() => {
			g.current?.focus();
		}, 50));
	}, [e]);
	let v = a(() => d ? {
		id: "suite-apps",
		heading: "JDLC Cloud Suite",
		items: st.filter((e) => e.id !== u).map((e) => ({
			id: `suite-${e.id}`,
			title: `Switch to ${e.name}`,
			subtitle: e.description,
			badge: "JDLC App",
			icon: /* @__PURE__ */ c("span", {
				className: "w-4 h-4 rounded flex items-center justify-center text-[10px] text-white shrink-0 font-bold",
				style: { backgroundColor: e.color },
				children: e.name[0]
			}),
			action: () => {
				let t = $(e.id);
				window.location.href = t;
			}
		}))
	} : null, [d, u]), y = a(() => {
		let e = [...r];
		v && v.items.length > 0 && e.push(v);
		let t = f.trim().toLowerCase();
		return t ? e.map((e) => ({
			...e,
			items: (e.items || []).filter((e) => {
				let n = e.title?.toLowerCase().includes(t), r = e.subtitle?.toLowerCase().includes(t), i = e.keywords?.some((e) => e.toLowerCase().includes(t));
				return n || r || i;
			})
		})).filter((e) => e.items.length > 0) : e;
	}, [
		r,
		v,
		f
	]), b = a(() => {
		let e = [];
		return y.forEach((t) => {
			(t.items || []).forEach((t) => {
				e.push(t);
			});
		}), e;
	}, [y]);
	i(() => {
		m >= b.length && h(Math.max(0, b.length - 1));
	}, [b.length, m]), i(() => {
		_.current[m] && _.current[m]?.scrollIntoView({
			block: "nearest",
			behavior: "smooth"
		});
	}, [m]);
	let x = (e) => {
		if (e.key === "ArrowDown") e.preventDefault(), h((e) => (e + 1) % Math.max(1, b.length));
		else if (e.key === "ArrowUp") e.preventDefault(), h((e) => e <= 0 ? b.length - 1 : e - 1);
		else if (e.key === "Enter") {
			e.preventDefault();
			let n = b[m];
			n && typeof n.action == "function" && (n.action(), t());
		} else e.key === "Escape" && (e.preventDefault(), t());
	};
	if (!e) return null;
	let S = 0;
	return /* @__PURE__ */ l("div", {
		className: "fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 pb-6 animate-in fade-in duration-150",
		role: "dialog",
		"aria-modal": "true",
		"aria-label": "Command Palette",
		onClick: t,
		children: [/* @__PURE__ */ c("div", { className: "fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity" }), /* @__PURE__ */ l("div", {
			className: "relative w-full max-w-xl bg-[var(--bg-surface)] border border-[var(--border-medium)] rounded-2xl shadow-2xl z-10 overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-150",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ l("div", {
					className: "flex items-center gap-3 px-4 py-3.5 border-b border-[var(--border-subtle)] bg-[var(--bg-subtle)]/60",
					children: [
						/* @__PURE__ */ c("svg", {
							viewBox: "0 0 20 20",
							fill: "currentColor",
							className: "w-5 h-5 text-slate-400 shrink-0",
							children: /* @__PURE__ */ c("path", {
								fillRule: "evenodd",
								d: "M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z",
								clipRule: "evenodd"
							})
						}),
						/* @__PURE__ */ c("input", {
							ref: g,
							type: "text",
							value: f,
							onChange: (e) => {
								p(e.target.value), h(0);
							},
							onKeyDown: x,
							placeholder: n,
							className: "flex-1 bg-transparent text-sm font-medium text-slate-100 placeholder-slate-400 focus:outline-none"
						}),
						/* @__PURE__ */ c("kbd", {
							className: "hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-semibold text-slate-400 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-md shadow-xs",
							children: "ESC"
						})
					]
				}),
				/* @__PURE__ */ c("div", {
					className: "p-2 overflow-y-auto space-y-4 max-h-[60vh]",
					children: b.length === 0 ? /* @__PURE__ */ c("div", {
						className: "p-8 text-center text-slate-400 text-xs",
						children: "No matching commands or destinations found."
					}) : y.map((e) => /* @__PURE__ */ l("div", {
						className: "space-y-1",
						children: [e.heading && /* @__PURE__ */ c("div", {
							className: "px-2.5 py-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase font-[var(--font-heading)]",
							children: e.heading
						}), e.items.map((e) => {
							let n = S++;
							return /* @__PURE__ */ l("button", {
								ref: (e) => _.current[n] = e,
								type: "button",
								onClick: () => {
									typeof e.action == "function" && e.action(), t();
								},
								onMouseEnter: () => h(n),
								className: X("w-full flex items-center justify-between gap-3 px-3 py-2 rounded-xl text-left text-xs transition-colors cursor-pointer", n === m ? "bg-[var(--bg-hover)] text-white border border-[var(--border-subtle)]" : "text-slate-300 hover:text-white border border-transparent"),
								children: [/* @__PURE__ */ l("div", {
									className: "flex items-center gap-2.5 min-w-0",
									children: [e.icon && /* @__PURE__ */ c("div", {
										className: "shrink-0",
										children: e.icon
									}), /* @__PURE__ */ l("div", {
										className: "truncate",
										children: [/* @__PURE__ */ c("span", {
											className: "font-semibold text-slate-100",
											children: e.title
										}), e.subtitle && /* @__PURE__ */ c("span", {
											className: "text-slate-400 text-[11px] block truncate",
											children: e.subtitle
										})]
									})]
								}), /* @__PURE__ */ l("div", {
									className: "flex items-center gap-1.5 shrink-0",
									children: [e.badge && /* @__PURE__ */ c(Q, {
										variant: "subtle",
										size: "xs",
										className: "text-[9px] py-0 px-1 font-mono",
										children: e.badge
									}), e.shortcut && /* @__PURE__ */ c("kbd", {
										className: "px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded shadow-xs",
										children: e.shortcut
									})]
								})]
							}, e.id || e.title);
						})]
					}, e.id || e.heading))
				}),
				/* @__PURE__ */ l("div", {
					className: "flex items-center justify-between px-4 py-2 border-t border-[var(--border-subtle)] bg-[var(--bg-subtle)]/40 text-[10px] text-slate-400",
					children: [/* @__PURE__ */ l("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ l("span", { children: [/* @__PURE__ */ c("kbd", {
							className: "font-mono bg-[var(--bg-elevated)] px-1 rounded",
							children: "↑↓"
						}), " navigate"] }), /* @__PURE__ */ l("span", { children: [/* @__PURE__ */ c("kbd", {
							className: "font-mono bg-[var(--bg-elevated)] px-1 rounded",
							children: "↵"
						}), " select"] })]
					}), /* @__PURE__ */ c("span", {
						className: "font-medium text-slate-400",
						children: "JDLC Suite Command"
					})]
				})
			]
		})]
	});
}
//#endregion
//#region src/components/Avatar.jsx
var mt = {
	notionists: "notionists",
	moods: "moods",
	critters: "critters",
	bottts: "bottts",
	"fun-emoji": "fun-emoji"
};
function ht({ seed: e = "jdlc-user", suit: t = "notionists", size: n = 64, radius: r = 50, backgroundColor: i = null } = {}) {
	let a = mt[t] || "notionists", o = new URLSearchParams({
		seed: encodeURIComponent(e || "jdlc-user"),
		size: n.toString()
	});
	return r != null && o.set("radius", r.toString()), i && o.set("backgroundColor", i.replace("#", "")), `https://api.dicebear.com/10.x/${a}/svg?${o.toString()}`;
}
var gt = {
	xs: {
		container: "w-5 h-5 text-[9px]",
		status: "w-1.5 h-1.5 ring-1",
		px: 20
	},
	sm: {
		container: "w-7 h-7 text-xs",
		status: "w-2 h-2 ring-1.5",
		px: 28
	},
	md: {
		container: "w-9 h-9 text-sm",
		status: "w-2.5 h-2.5 ring-2",
		px: 36
	},
	lg: {
		container: "w-11 h-11 text-base",
		status: "w-3 h-3 ring-2",
		px: 44
	},
	xl: {
		container: "w-14 h-14 text-lg",
		status: "w-3.5 h-3.5 ring-2",
		px: 56
	}
}, _t = {
	circle: "rounded-full",
	rounded: "rounded-xl",
	square: "rounded-none"
}, vt = {
	online: "bg-emerald-500",
	busy: "bg-rose-500",
	away: "bg-amber-500",
	offline: "bg-slate-500"
};
function yt({ seed: e, name: t, src: n, suit: r = "notionists", size: i = "md", shape: a = "circle", status: o, className: u, alt: d, ...f }) {
	let [p, m] = s(!1), h = gt[i] || gt.md, g = _t[a] || _t.circle, _ = (t || e || "U").toString().trim().charAt(0).toUpperCase(), v = n || ht({
		seed: e || t || "jdlc-user",
		suit: r,
		size: h.px * 2,
		radius: a === "circle" ? 50 : a === "rounded" ? 20 : 0
	});
	return /* @__PURE__ */ l("div", {
		className: X("relative inline-flex items-center justify-center shrink-0 select-none bg-[var(--bg-elevated)] border border-[var(--border-subtle)] overflow-hidden shadow-xs", h.container, g, u),
		...f,
		children: [p ? /* @__PURE__ */ c("span", {
			className: "font-bold text-slate-200 uppercase font-[var(--font-heading)] leading-none",
			children: _
		}) : /* @__PURE__ */ c("img", {
			src: v,
			alt: d || t || e || "User Avatar",
			onError: () => m(!0),
			className: "w-full h-full object-cover",
			loading: "lazy"
		}), o && vt[o] && /* @__PURE__ */ c("span", {
			className: X("absolute bottom-0 right-0 rounded-full ring-[var(--bg-surface)]", h.status, vt[o]),
			"aria-label": `Status: ${o}`
		})]
	});
}
function bt({ children: t, max: n = 4, size: r = "sm", className: i }) {
	let a = e.Children.toArray(t), o = a.slice(0, n), s = a.length - n, u = gt[r] || gt.sm;
	return /* @__PURE__ */ l("div", {
		className: X("flex items-center -space-x-2", i),
		children: [o.map((t, n) => /* @__PURE__ */ c("div", {
			className: "relative ring-2 ring-[var(--bg-root)] rounded-full",
			children: e.isValidElement(t) ? e.cloneElement(t, { size: r }) : t
		}, n)), s > 0 && /* @__PURE__ */ l("div", {
			className: X("relative inline-flex items-center justify-center rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] ring-2 ring-[var(--bg-root)] font-bold text-slate-300 font-mono text-[10px]", u.container),
			title: `${s} more`,
			children: ["+", s]
		})]
	});
}
//#endregion
//#region src/components/UserMenu.jsx
function xt({ user: e, displayName: t, avatarSeed: n, avatarSuit: r = "notionists", status: a = "online", onSignIn: u, onSignOut: d, onOpenProfile: f, onOpenGuide: p, extraMenuItems: m = [], className: h, align: g = "right" }) {
	let [_, v] = s(!1), y = o(null), { currentThemeConfig: b } = Ke();
	i(() => {
		function e(e) {
			y.current && !y.current.contains(e.target) && v(!1);
		}
		return _ && document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [_]);
	let x = t || e?.user_metadata?.displayName || e?.email?.split("@")[0] || "Guest User", S = e?.email || "Local Offline Session", C = n || e?.email || x || "guest", w = !!e;
	return /* @__PURE__ */ l("div", {
		className: X("relative inline-block text-left", h),
		ref: y,
		children: [/* @__PURE__ */ l("button", {
			type: "button",
			onClick: () => v((e) => !e),
			className: X("flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-main)] hover:border-[var(--border-medium)] hover:bg-[var(--bg-hover)] transition-all cursor-pointer", _ && "border-[var(--border-medium)] bg-[var(--bg-elevated)]"),
			title: w ? `Signed in as ${x}` : "Account & Preferences",
			"aria-expanded": _,
			children: [
				/* @__PURE__ */ c(yt, {
					seed: C,
					name: x,
					suit: r,
					size: "xs",
					status: w ? a : void 0
				}),
				/* @__PURE__ */ c("span", {
					className: "text-xs font-semibold max-w-[110px] truncate hidden sm:inline-block",
					children: x
				}),
				/* @__PURE__ */ c("svg", {
					viewBox: "0 0 20 20",
					fill: "currentColor",
					className: X("w-3.5 h-3.5 text-slate-400 transition-transform duration-150", _ && "rotate-180"),
					children: /* @__PURE__ */ c("path", {
						fillRule: "evenodd",
						d: "M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z",
						clipRule: "evenodd"
					})
				})
			]
		}), _ && /* @__PURE__ */ l("div", {
			className: X("absolute z-50 mt-2 w-72 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-medium)] p-3 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150", g === "right" ? "right-0" : "left-0"),
			children: [
				/* @__PURE__ */ l("div", {
					className: "flex items-center gap-3 p-2 bg-[var(--bg-elevated)]/80 rounded-xl border border-[var(--border-subtle)] mb-2",
					children: [/* @__PURE__ */ c(yt, {
						seed: C,
						name: x,
						suit: r,
						size: "md",
						status: w ? a : void 0
					}), /* @__PURE__ */ l("div", {
						className: "flex-1 min-w-0",
						children: [/* @__PURE__ */ l("div", {
							className: "flex items-center justify-between gap-1",
							children: [/* @__PURE__ */ c("span", {
								className: "font-bold text-xs text-[var(--text-main)] truncate font-[var(--font-heading)]",
								children: x
							}), /* @__PURE__ */ c(Q, {
								variant: w ? "success" : "subtle",
								size: "xs",
								className: "font-mono text-[9px] py-0 px-1",
								children: w ? "Connected" : "Guest"
							})]
						}), /* @__PURE__ */ c("p", {
							className: "text-[11px] text-[var(--text-dim)] truncate mt-0.5",
							children: S
						})]
					})]
				}),
				/* @__PURE__ */ l("div", {
					className: "px-2 py-1.5 flex items-center justify-between text-xs border-b border-[var(--border-subtle)]",
					children: [/* @__PURE__ */ c("span", {
						className: "text-[var(--text-muted)] font-medium",
						children: "Theme"
					}), /* @__PURE__ */ c(ot, { align: "right" })]
				}),
				/* @__PURE__ */ l("div", {
					className: "py-1 space-y-0.5 border-b border-[var(--border-subtle)]",
					children: [
						f && /* @__PURE__ */ l("button", {
							type: "button",
							onClick: () => {
								v(!1), f();
							},
							className: "w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer text-left",
							children: [/* @__PURE__ */ c("svg", {
								viewBox: "0 0 20 20",
								fill: "currentColor",
								className: "w-4 h-4 text-[var(--text-dim)]",
								children: /* @__PURE__ */ c("path", { d: "M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" })
							}), /* @__PURE__ */ c("span", { children: "Profile & Settings" })]
						}),
						p && /* @__PURE__ */ l("button", {
							type: "button",
							onClick: () => {
								v(!1), p();
							},
							className: "w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer text-left",
							children: [/* @__PURE__ */ c("svg", {
								viewBox: "0 0 20 20",
								fill: "currentColor",
								className: "w-4 h-4 text-[var(--text-dim)]",
								children: /* @__PURE__ */ c("path", {
									fillRule: "evenodd",
									d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
									clipRule: "evenodd"
								})
							}), /* @__PURE__ */ c("span", { children: "Handbook & Guide" })]
						}),
						m.map((e, t) => /* @__PURE__ */ l("button", {
							type: "button",
							onClick: () => {
								v(!1), e.onClick?.();
							},
							className: X("w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer text-left", e.danger ? "text-rose-400 hover:bg-rose-500/10" : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-hover)]"),
							children: [e.icon && /* @__PURE__ */ c("span", {
								className: "w-4 h-4 text-[var(--text-dim)]",
								children: e.icon
							}), /* @__PURE__ */ c("span", { children: e.label })]
						}, t))
					]
				}),
				/* @__PURE__ */ c("div", {
					className: "pt-1.5",
					children: w ? /* @__PURE__ */ l("button", {
						type: "button",
						onClick: () => {
							v(!1), d?.();
						},
						className: "w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors cursor-pointer",
						children: [/* @__PURE__ */ c("span", { children: "Sign Out" }), /* @__PURE__ */ l("svg", {
							viewBox: "0 0 20 20",
							fill: "currentColor",
							className: "w-4 h-4",
							children: [/* @__PURE__ */ c("path", {
								fillRule: "evenodd",
								d: "M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z",
								clipRule: "evenodd"
							}), /* @__PURE__ */ c("path", {
								fillRule: "evenodd",
								d: "M19 10a.75.75 0 00-.75-.75H8.704l2.523-2.523a.75.75 0 10-1.06-1.06l-3.81 3.81a.75.75 0 000 1.06l3.81 3.81a.75.75 0 101.06-1.06L8.704 10.75H18.25A.75.75 0 0019 10z",
								clipRule: "evenodd"
							})]
						})]
					}) : /* @__PURE__ */ l("button", {
						type: "button",
						onClick: () => {
							v(!1), u?.();
						},
						className: "w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[var(--color-primary-glow)] hover:bg-[var(--color-primary)]/10 transition-colors cursor-pointer",
						children: [/* @__PURE__ */ c("span", { children: "Sign In / Connect Cloud" }), /* @__PURE__ */ c("svg", {
							viewBox: "0 0 20 20",
							fill: "currentColor",
							className: "w-4 h-4",
							children: /* @__PURE__ */ c("path", {
								fillRule: "evenodd",
								d: "M3 10a.75.75 0 01.75-.75h9.544l-2.523-2.523a.75.75 0 111.06-1.06l3.81 3.81a.75.75 0 010 1.06l-3.81 3.81a.75.75 0 11-1.06-1.06l2.523-2.523H3.75A.75.75 0 013 10z",
								clipRule: "evenodd"
							})
						})]
					})
				})
			]
		})]
	});
}
//#endregion
//#region src/components/AppHeader.jsx
function St({ currentApp: e = "taskflow", appName: t = "Task", appAccent: n = "Flow", subtitle: r, icon: i, badge: a = "JDLC", statusBadge: o, onBrandClick: s, tabs: u, activeTab: d, onTabChange: f, centerContent: p, utilities: m, primaryAction: h, onOpenPalette: g, userMenu: _, showThemeSelector: v = !0, className: y, mobileBottomTabs: b = !1 }) {
	return /* @__PURE__ */ l("header", {
		className: X("sticky top-0 z-30 w-full border-b border-[var(--border-subtle)] bg-[var(--bg-root)]/90 backdrop-blur-md transition-colors duration-200", y),
		children: [/* @__PURE__ */ l("div", {
			className: "w-full px-4 sm:px-6 h-16 flex items-center justify-between gap-3 sm:gap-4",
			children: [
				/* @__PURE__ */ l("div", {
					className: "flex items-center gap-2 sm:gap-3 shrink-0",
					children: [/* @__PURE__ */ c(ct, { currentApp: e }), s ? /* @__PURE__ */ l("button", {
						type: "button",
						onClick: s,
						className: "flex items-center gap-2.5 sm:gap-3 hover:opacity-85 active:scale-[0.98] transition-all focus:outline-none rounded-xl cursor-pointer text-left",
						title: "Application Details",
						children: [/* @__PURE__ */ c("div", {
							className: "w-9 h-9 rounded-xl bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white shadow-md shadow-[var(--color-primary)]/20 shrink-0",
							children: i
						}), /* @__PURE__ */ l("div", { children: [/* @__PURE__ */ l("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ l("span", {
									className: "font-extrabold text-base sm:text-lg tracking-tight font-[var(--font-heading)] text-[var(--text-main)]",
									children: [t, /* @__PURE__ */ c("span", {
										className: "text-[var(--color-primary-glow)]",
										children: n
									})]
								}),
								a && /* @__PURE__ */ c(Q, {
									variant: "subtle",
									size: "xs",
									className: "font-mono uppercase font-bold text-[9px] tracking-wider",
									children: a
								}),
								o
							]
						}), r && /* @__PURE__ */ c("p", {
							className: "text-[11px] text-[var(--text-muted)] hidden lg:block leading-tight mt-0.5",
							children: r
						})] })]
					}) : /* @__PURE__ */ l("div", {
						className: "flex items-center gap-2.5 sm:gap-3",
						children: [/* @__PURE__ */ c("div", {
							className: "w-9 h-9 rounded-xl bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white shadow-md shadow-[var(--color-primary)]/20 shrink-0",
							children: i
						}), /* @__PURE__ */ l("div", { children: [/* @__PURE__ */ l("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ l("span", {
									className: "font-extrabold text-base sm:text-lg tracking-tight font-[var(--font-heading)] text-[var(--text-main)]",
									children: [t, /* @__PURE__ */ c("span", {
										className: "text-[var(--color-primary-glow)]",
										children: n
									})]
								}),
								a && /* @__PURE__ */ c(Q, {
									variant: "subtle",
									size: "xs",
									className: "font-mono uppercase font-bold text-[9px] tracking-wider",
									children: a
								}),
								o
							]
						}), r && /* @__PURE__ */ c("p", {
							className: "text-[11px] text-[var(--text-muted)] hidden lg:block leading-tight mt-0.5",
							children: r
						})] })]
					})]
				}),
				/* @__PURE__ */ l("div", {
					className: "flex items-center justify-center flex-1 max-w-xl mx-2",
					children: [u && u.length > 0 && /* @__PURE__ */ c("div", {
						className: X(b ? "hidden md:flex items-center" : "flex items-center"),
						children: /* @__PURE__ */ c(at, {
							tabs: u,
							activeTab: d,
							onChange: f
						})
					}), p]
				}),
				/* @__PURE__ */ l("div", {
					className: "flex items-center gap-2 sm:gap-2.5 shrink-0",
					children: [
						m,
						g && /* @__PURE__ */ l("button", {
							type: "button",
							onClick: g,
							className: "hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--border-medium)] transition-colors cursor-pointer",
							title: "Open Command Palette (⌘K)",
							children: [/* @__PURE__ */ c("svg", {
								viewBox: "0 0 20 20",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "2",
								className: "w-3.5 h-3.5",
								children: /* @__PURE__ */ c("path", {
									strokeLinecap: "round",
									strokeLinejoin: "round",
									d: "M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM19 19l-4.35-4.35"
								})
							}), /* @__PURE__ */ c("kbd", {
								className: "text-[10px] font-mono opacity-80",
								children: "⌘K"
							})]
						}),
						h,
						v && /* @__PURE__ */ c("div", {
							className: "hidden sm:block",
							children: /* @__PURE__ */ c(ot, { align: "right" })
						}),
						_
					]
				})
			]
		}), b && u && u.length > 0 && /* @__PURE__ */ c("div", {
			className: "md:hidden border-t border-[var(--border-subtle)] px-3 py-1.5 bg-[var(--bg-root)]/95 flex justify-center",
			children: /* @__PURE__ */ c(at, {
				tabs: u,
				activeTab: d,
				onChange: f,
				className: "w-full justify-center"
			})
		})]
	});
}
//#endregion
export { St as AppHeader, ct as AppSwitcher, yt as Avatar, bt as AvatarGroup, Q as Badge, qe as Button, Je as Card, Qe as CardContent, Ze as CardDescription, $e as CardFooter, Ye as CardHeader, Xe as CardTitle, pt as CommandPalette, mt as DICEBEAR_SUITS, rt as Dialog, it as Dropdown, et as Input, st as SUITE_APPS, nt as Select, Z as THEMES, at as Tabs, tt as Textarea, Ge as ThemeProvider, ot as ThemeSelector, ut as ToastProvider, xt as UserMenu, X as cn, ht as getDiceBearAvatarUrl, $ as getSuiteAppUrl, Ke as useTheme, dt as useToast };
