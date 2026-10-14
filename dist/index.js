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
	E(e, t, n, r);
}, T = (e, t, n) => {
	let r = e === "" ? t : D(t, e);
	r.classGroupId = n;
}, ee = (e, t, n, r) => {
	if (te(e)) {
		C(e(r), t, n, r);
		return;
	}
	t.validators === null && (t.validators = []), t.validators.push(p(n, e));
}, E = (e, t, n, r) => {
	let i = Object.entries(e), a = i.length;
	for (let e = 0; e < a; e++) {
		let [a, o] = i[e];
		C(o, D(t, a), n, r);
	}
}, D = (e, t) => {
	let n = e, r = t.split(h), i = r.length;
	for (let e = 0; e < i; e++) {
		let t = r[e], i = n.nextPart.get(t);
		i || (i = m(), n.nextPart.set(t, i)), n = i;
	}
	return n;
}, te = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, O = (e) => {
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
}, k = "!", A = ":", j = [], M = (e, t, n, r, i) => ({
	modifiers: e,
	hasImportantModifier: t,
	baseClassName: n,
	maybePostfixModifierPosition: r,
	isExternal: i
}), ne = (e) => {
	let { prefix: t, experimentalParseClassName: n } = e, r = (e) => {
		let t = [], n = 0, r = 0, i = 0, a, o = e.length;
		for (let s = 0; s < o; s++) {
			let o = e[s];
			if (n === 0 && r === 0) {
				if (o === A) {
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
		s.endsWith(k) ? (c = s.slice(0, -1), l = !0) : s.startsWith(k) && (c = s.slice(1), l = !0);
		let u = a && a > i ? a - i : void 0;
		return M(t, l, c, u);
	};
	if (t) {
		let e = t + A, n = r;
		r = (t) => t.startsWith(e) ? n(t.slice(e.length)) : M(j, !1, t, void 0, !0);
	}
	if (n) {
		let e = r;
		r = (t) => n({
			className: t,
			parseClassName: e
		});
	}
	return r;
}, N = (e) => {
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
}, re = (e) => ({
	cache: O(e.cacheSize),
	parseClassName: ne(e),
	sortModifiers: N(e),
	postfixLookupClassGroupIds: ie(e),
	...v(e)
}), ie = (e) => {
	let t = Object.create(null), n = e.postfixLookupClassGroups;
	if (n) for (let e = 0; e < n.length; e++) t[n[e]] = !0;
	return t;
}, ae = /\s+/, oe = (e, t) => {
	let { parseClassName: n, getClassGroupId: r, getConflictingClassGroupIds: i, sortModifiers: a, postfixLookupClassGroupIds: o } = t, s = [], c = e.trim().split(ae), l = "";
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
		let _ = d.length === 0 ? "" : d.length === 1 ? d[0] : a(d).join(":"), v = f ? _ + k : _, y = v + g;
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
}, P = (...e) => {
	let t = 0, n, r, i = "";
	for (; t < e.length;) (n = e[t++]) && (r = F(n)) && (i && (i += " "), i += r);
	return i;
}, F = (e) => {
	if (typeof e == "string") return e;
	let t, n = "";
	for (let r = 0; r < e.length; r++) e[r] && (t = F(e[r])) && (n && (n += " "), n += t);
	return n;
}, I = (e, ...t) => {
	let n, r, i, a, o = (o) => (n = re(t.reduce((e, t) => t(e), e())), r = n.cache.get, i = n.cache.set, a = s, s(o)), s = (e) => {
		let t = r(e);
		if (t) return t;
		let a = oe(e, n);
		return i(e, a), a;
	};
	return a = o, (...e) => a(P(...e));
}, se = [], L = (e) => {
	let t = (t) => t[e] || se;
	return t.isThemeGetter = !0, t.themeKey = e, t;
}, R = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, ce = /^\((?:(\w[\w-]*):)?(.+)\)$/i, le = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, ue = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, de = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, z = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix|color|light-dark)\(.+\)$/, fe = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, pe = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, B = (e) => le.test(e), V = (e) => !!e && !Number.isNaN(Number(e)), H = (e) => !!e && Number.isInteger(Number(e)), me = (e) => e.endsWith("%") && V(e.slice(0, -1)), U = (e) => ue.test(e), he = () => !0, ge = (e) => de.test(e) && !z.test(e), _e = () => !1, ve = (e) => fe.test(e), ye = (e) => pe.test(e), be = (e) => !W(e) && !K(e), xe = (e) => e.startsWith("@container") && (e[10] === "/" && e[11] !== void 0 || e[11] === "s" && e[16] !== void 0 && e.startsWith("-size/", 10) || e[11] === "n" && e[18] !== void 0 && e.startsWith("-normal/", 10)), Se = (e) => J(e, Le, _e), W = (e) => R.test(e), G = (e) => J(e, Re, ge), Ce = (e) => J(e, ze, V), we = (e) => J(e, Ve, he), Te = (e) => J(e, Be, _e), Ee = (e) => J(e, Fe, _e), De = (e) => J(e, Ie, ye), Oe = (e) => J(e, He, ve), K = (e) => ce.test(e), q = (e) => Y(e, Re), ke = (e) => Y(e, Be), Ae = (e) => Y(e, Fe), je = (e) => Y(e, Le), Me = (e) => Y(e, Ie), Ne = (e) => Y(e, He, !0), Pe = (e) => Y(e, Ve, !0), J = (e, t, n) => {
	let r = R.exec(e);
	return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, Y = (e, t, n = !1) => {
	let r = ce.exec(e);
	return r ? r[1] ? t(r[1]) : n : !1;
}, Fe = (e) => e === "position" || e === "percentage", Ie = (e) => e === "image" || e === "url", Le = (e) => e === "length" || e === "size" || e === "bg-size", Re = (e) => e === "length", ze = (e) => e === "number", Be = (e) => e === "family-name", Ve = (e) => e === "number" || e === "weight", He = (e) => e === "shadow", Ue = /*#__PURE__*/ I(() => {
	let e = L("color"), t = L("font"), n = L("text"), r = L("font-weight"), i = L("tracking"), a = L("leading"), o = L("breakpoint"), s = L("container"), c = L("spacing"), l = L("radius"), u = L("shadow"), d = L("inset-shadow"), f = L("text-shadow"), p = L("drop-shadow"), m = L("blur"), h = L("perspective"), g = L("aspect"), _ = L("ease"), v = L("animate"), y = () => [
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
	], E = () => [
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
	], D = () => [
		H,
		"auto",
		K,
		W
	], te = () => [
		"auto",
		"min",
		"max",
		"fr",
		K,
		W
	], O = () => [
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
	], k = () => [
		"start",
		"end",
		"center",
		"stretch",
		"center-safe",
		"end-safe"
	], A = () => ["auto", ...w()], j = () => [
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
	], M = () => [
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
	], ne = () => [
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
	], N = () => [
		e,
		K,
		W
	], re = () => [
		...b(),
		Ae,
		Ee,
		{ position: [K, W] }
	], ie = () => ["no-repeat", { repeat: [
		"",
		"x",
		"y",
		"space",
		"round"
	] }], ae = () => [
		"auto",
		"cover",
		"contain",
		je,
		Se,
		{ size: [K, W] }
	], oe = () => [
		me,
		q,
		G
	], P = () => [
		"",
		"none",
		"full",
		l,
		K,
		W
	], F = () => [
		"",
		V,
		q,
		G
	], I = () => [
		"solid",
		"dashed",
		"dotted",
		"double"
	], se = () => [
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
	], R = () => [
		V,
		me,
		Ae,
		Ee
	], ce = () => [
		"",
		"none",
		m,
		K,
		W
	], le = () => [
		"none",
		V,
		K,
		W
	], ue = () => [
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
			"col-start-end": [{ col: E() }],
			"col-start": [{ "col-start": D() }],
			"col-end": [{ "col-end": D() }],
			"grid-rows": [{ "grid-rows": ee() }],
			"row-start-end": [{ row: E() }],
			"row-start": [{ "row-start": D() }],
			"row-end": [{ "row-end": D() }],
			"grid-flow": [{ "grid-flow": [
				"row",
				"col",
				"dense",
				"row-dense",
				"col-dense"
			] }],
			"auto-cols": [{ "auto-cols": te() }],
			"auto-rows": [{ "auto-rows": te() }],
			gap: [{ gap: w() }],
			"gap-x": [{ "gap-x": w() }],
			"gap-y": [{ "gap-y": w() }],
			"justify-content": [{ justify: [...O(), "normal"] }],
			"justify-items": [{ "justify-items": [...k(), "normal"] }],
			"justify-self": [{ "justify-self": ["auto", ...k()] }],
			"align-content": [{ content: ["normal", ...O()] }],
			"align-items": [{ items: [...k(), { baseline: ["", "last"] }] }],
			"align-self": [{ self: [
				"auto",
				...k(),
				{ baseline: ["", "last"] }
			] }],
			"place-content": [{ "place-content": O() }],
			"place-items": [{ "place-items": [...k(), "baseline"] }],
			"place-self": [{ "place-self": ["auto", ...k()] }],
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
			m: [{ m: A() }],
			mx: [{ mx: A() }],
			my: [{ my: A() }],
			ms: [{ ms: A() }],
			me: [{ me: A() }],
			mbs: [{ mbs: A() }],
			mbe: [{ mbe: A() }],
			mt: [{ mt: A() }],
			mr: [{ mr: A() }],
			mb: [{ mb: A() }],
			ml: [{ ml: A() }],
			"space-x": [{ "space-x": w() }],
			"space-x-reverse": ["space-x-reverse"],
			"space-y": [{ "space-y": w() }],
			"space-y-reverse": ["space-y-reverse"],
			size: [{ size: j() }],
			"inline-size": [{ inline: ["auto", ...M()] }],
			"min-inline-size": [{ "min-inline": ["auto", ...M()] }],
			"max-inline-size": [{ "max-inline": ["none", ...M()] }],
			"block-size": [{ block: ["auto", ...ne()] }],
			"min-block-size": [{ "min-block": ["auto", ...ne()] }],
			"max-block-size": [{ "max-block": ["none", ...ne()] }],
			w: [{ w: [
				s,
				"screen",
				...j()
			] }],
			"min-w": [{ "min-w": [
				s,
				"screen",
				"none",
				...j()
			] }],
			"max-w": [{ "max-w": [
				s,
				"screen",
				"none",
				"prose",
				{ screen: [o] },
				...j()
			] }],
			h: [{ h: [
				"screen",
				"lh",
				...j()
			] }],
			"min-h": [{ "min-h": [
				"screen",
				"lh",
				"none",
				...j()
			] }],
			"max-h": [{ "max-h": [
				"screen",
				"lh",
				"none",
				...j()
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
			"placeholder-color": [{ placeholder: N() }],
			"text-color": [{ text: N() }],
			"text-decoration": [
				"underline",
				"overline",
				"line-through",
				"no-underline"
			],
			"text-decoration-style": [{ decoration: [...I(), "wavy"] }],
			"text-decoration-thickness": [{ decoration: [
				V,
				"from-font",
				"auto",
				K,
				G
			] }],
			"text-decoration-color": [{ decoration: N() }],
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
			"bg-position": [{ bg: re() }],
			"bg-repeat": [{ bg: ie() }],
			"bg-size": [{ bg: ae() }],
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
			"bg-color": [{ bg: N() }],
			"gradient-from-pos": [{ from: oe() }],
			"gradient-via-pos": [{ via: oe() }],
			"gradient-to-pos": [{ to: oe() }],
			"gradient-from": [{ from: N() }],
			"gradient-via": [{ via: N() }],
			"gradient-to": [{ to: N() }],
			rounded: [{ rounded: P() }],
			"rounded-s": [{ "rounded-s": P() }],
			"rounded-e": [{ "rounded-e": P() }],
			"rounded-t": [{ "rounded-t": P() }],
			"rounded-r": [{ "rounded-r": P() }],
			"rounded-b": [{ "rounded-b": P() }],
			"rounded-l": [{ "rounded-l": P() }],
			"rounded-ss": [{ "rounded-ss": P() }],
			"rounded-se": [{ "rounded-se": P() }],
			"rounded-ee": [{ "rounded-ee": P() }],
			"rounded-es": [{ "rounded-es": P() }],
			"rounded-tl": [{ "rounded-tl": P() }],
			"rounded-tr": [{ "rounded-tr": P() }],
			"rounded-br": [{ "rounded-br": P() }],
			"rounded-bl": [{ "rounded-bl": P() }],
			"border-w": [{ border: F() }],
			"border-w-x": [{ "border-x": F() }],
			"border-w-y": [{ "border-y": F() }],
			"border-w-s": [{ "border-s": F() }],
			"border-w-e": [{ "border-e": F() }],
			"border-w-bs": [{ "border-bs": F() }],
			"border-w-be": [{ "border-be": F() }],
			"border-w-t": [{ "border-t": F() }],
			"border-w-r": [{ "border-r": F() }],
			"border-w-b": [{ "border-b": F() }],
			"border-w-l": [{ "border-l": F() }],
			"divide-x": [{ "divide-x": F() }],
			"divide-x-reverse": ["divide-x-reverse"],
			"divide-y": [{ "divide-y": F() }],
			"divide-y-reverse": ["divide-y-reverse"],
			"border-style": [{ border: [
				...I(),
				"hidden",
				"none"
			] }],
			"divide-style": [{ divide: [
				...I(),
				"hidden",
				"none"
			] }],
			"border-color": [{ border: N() }],
			"border-color-x": [{ "border-x": N() }],
			"border-color-y": [{ "border-y": N() }],
			"border-color-s": [{ "border-s": N() }],
			"border-color-e": [{ "border-e": N() }],
			"border-color-bs": [{ "border-bs": N() }],
			"border-color-be": [{ "border-be": N() }],
			"border-color-t": [{ "border-t": N() }],
			"border-color-r": [{ "border-r": N() }],
			"border-color-b": [{ "border-b": N() }],
			"border-color-l": [{ "border-l": N() }],
			"divide-color": [{ divide: N() }],
			"outline-style": [{ outline: [
				...I(),
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
			"outline-color": [{ outline: N() }],
			shadow: [{ shadow: [
				"",
				"inner",
				"none",
				u,
				Ne,
				Oe
			] }],
			"shadow-color": [{ shadow: N() }],
			"inset-shadow": [{ "inset-shadow": [
				"none",
				d,
				Ne,
				Oe
			] }],
			"inset-shadow-color": [{ "inset-shadow": N() }],
			"ring-w": [{ ring: F() }],
			"ring-w-inset": ["ring-inset"],
			"ring-color": [{ ring: N() }],
			"ring-offset-w": [{ "ring-offset": [V, G] }],
			"ring-offset-color": [{ "ring-offset": N() }],
			"inset-ring-w": [{ "inset-ring": F() }],
			"inset-ring-color": [{ "inset-ring": N() }],
			"text-shadow": [{ "text-shadow": [
				"none",
				f,
				Ne,
				Oe
			] }],
			"text-shadow-color": [{ "text-shadow": N() }],
			opacity: [{ opacity: [
				V,
				K,
				W
			] }],
			"mix-blend": [{ "mix-blend": [
				...se(),
				"plus-darker",
				"plus-lighter"
			] }],
			"bg-blend": [{ "bg-blend": se() }],
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
			"mask-image-linear-from-pos": [{ "mask-linear-from": R() }],
			"mask-image-linear-to-pos": [{ "mask-linear-to": R() }],
			"mask-image-linear-from-color": [{ "mask-linear-from": N() }],
			"mask-image-linear-to-color": [{ "mask-linear-to": N() }],
			"mask-image-t-from-pos": [{ "mask-t-from": R() }],
			"mask-image-t-to-pos": [{ "mask-t-to": R() }],
			"mask-image-t-from-color": [{ "mask-t-from": N() }],
			"mask-image-t-to-color": [{ "mask-t-to": N() }],
			"mask-image-r-from-pos": [{ "mask-r-from": R() }],
			"mask-image-r-to-pos": [{ "mask-r-to": R() }],
			"mask-image-r-from-color": [{ "mask-r-from": N() }],
			"mask-image-r-to-color": [{ "mask-r-to": N() }],
			"mask-image-b-from-pos": [{ "mask-b-from": R() }],
			"mask-image-b-to-pos": [{ "mask-b-to": R() }],
			"mask-image-b-from-color": [{ "mask-b-from": N() }],
			"mask-image-b-to-color": [{ "mask-b-to": N() }],
			"mask-image-l-from-pos": [{ "mask-l-from": R() }],
			"mask-image-l-to-pos": [{ "mask-l-to": R() }],
			"mask-image-l-from-color": [{ "mask-l-from": N() }],
			"mask-image-l-to-color": [{ "mask-l-to": N() }],
			"mask-image-x-from-pos": [{ "mask-x-from": R() }],
			"mask-image-x-to-pos": [{ "mask-x-to": R() }],
			"mask-image-x-from-color": [{ "mask-x-from": N() }],
			"mask-image-x-to-color": [{ "mask-x-to": N() }],
			"mask-image-y-from-pos": [{ "mask-y-from": R() }],
			"mask-image-y-to-pos": [{ "mask-y-to": R() }],
			"mask-image-y-from-color": [{ "mask-y-from": N() }],
			"mask-image-y-to-color": [{ "mask-y-to": N() }],
			"mask-image-radial": [{ "mask-radial": [K, W] }],
			"mask-image-radial-from-pos": [{ "mask-radial-from": R() }],
			"mask-image-radial-to-pos": [{ "mask-radial-to": R() }],
			"mask-image-radial-from-color": [{ "mask-radial-from": N() }],
			"mask-image-radial-to-color": [{ "mask-radial-to": N() }],
			"mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
			"mask-image-radial-size": [{ "mask-radial": [{
				closest: ["side", "corner"],
				farthest: ["side", "corner"]
			}] }],
			"mask-image-radial-pos": [{ "mask-radial-at": b() }],
			"mask-image-conic-pos": [{ "mask-conic": [V] }],
			"mask-image-conic-from-pos": [{ "mask-conic-from": R() }],
			"mask-image-conic-to-pos": [{ "mask-conic-to": R() }],
			"mask-image-conic-from-color": [{ "mask-conic-from": N() }],
			"mask-image-conic-to-color": [{ "mask-conic-to": N() }],
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
			"mask-position": [{ mask: re() }],
			"mask-repeat": [{ mask: ie() }],
			"mask-size": [{ mask: ae() }],
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
			blur: [{ blur: ce() }],
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
			"drop-shadow-color": [{ "drop-shadow": N() }],
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
			"backdrop-blur": [{ "backdrop-blur": ce() }],
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
			rotate: [{ rotate: le() }],
			"rotate-x": [{ "rotate-x": le() }],
			"rotate-y": [{ "rotate-y": le() }],
			"rotate-z": [{ "rotate-z": le() }],
			scale: [{ scale: ue() }],
			"scale-x": [{ "scale-x": ue() }],
			"scale-y": [{ "scale-y": ue() }],
			"scale-z": [{ "scale-z": ue() }],
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
			accent: [{ accent: N() }],
			appearance: [{ appearance: ["none", "auto"] }],
			"caret-color": [{ caret: N() }],
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
			"scrollbar-thumb-color": [{ "scrollbar-thumb": N() }],
			"scrollbar-track-color": [{ "scrollbar-track": N() }],
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
			fill: [{ fill: ["none", ...N()] }],
			"stroke-w": [{ stroke: [
				V,
				q,
				G,
				Ce
			] }],
			stroke: [{ stroke: ["none", ...N()] }],
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
//#region src/context/AvatarContext.jsx
var Z = [
	{
		id: "notionists",
		name: "Notionists",
		description: "Minimalist editorial sketches"
	},
	{
		id: "bottts",
		name: "Bottts",
		description: "Playful futuristic robots"
	},
	{
		id: "lorelei",
		name: "Lorelei",
		description: "Modern clean line portraits"
	},
	{
		id: "critters",
		name: "Critters",
		description: "Expressive cute animals"
	},
	{
		id: "moods",
		name: "Moods",
		description: "Geometric gradient emotion faces"
	},
	{
		id: "fun-emoji",
		name: "Fun Emoji",
		description: "Vibrant pop emoticon faces"
	},
	{
		id: "pixel-art",
		name: "Pixel Art",
		description: "Retro 8-bit gaming characters"
	},
	{
		id: "adventurer",
		name: "Adventurer",
		description: "Fantasy RPG portraits"
	}
], We = t({
	suit: "notionists",
	setSuit: () => {},
	currentSuitConfig: Z[0],
	availableSuits: Z
});
function Ge({ children: e, defaultSuit: t = "notionists", storageKey: n = "jdlc_avatar_suit" }) {
	let [r, a] = s(() => {
		try {
			if (typeof window < "u") {
				let e = localStorage.getItem(n);
				return e && Z.some((t) => t.id === e) ? e : t;
			}
			return t;
		} catch {
			return t;
		}
	});
	i(() => {
		try {
			typeof window < "u" && localStorage.setItem(n, r);
		} catch {}
	}, [r, n]);
	let o = Z.find((e) => e.id === r) || Z[0];
	return /* @__PURE__ */ c(We.Provider, {
		value: {
			suit: r,
			setSuit: a,
			currentSuitConfig: o,
			availableSuits: Z
		},
		children: e
	});
}
function Ke() {
	let e = r(We);
	if (!e) {
		let e = "notionists";
		try {
			if (typeof window < "u") {
				let t = localStorage.getItem("jdlc_avatar_suit");
				t && Z.some((e) => e.id === t) && (e = t);
			}
		} catch {}
		let t = Z.find((t) => t.id === e) || Z[0];
		return {
			suit: e,
			setSuit: () => {},
			currentSuitConfig: t,
			availableSuits: Z
		};
	}
	return e;
}
//#endregion
//#region src/context/ThemeContext.jsx
var Q = [
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
], qe = t({
	theme: "linear",
	setTheme: () => {},
	currentThemeConfig: Q[0],
	availableThemes: Q
});
function Je({ children: e, defaultTheme: t = "linear", storageKey: n = "jdlc_theme" }) {
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
	let o = Q.find((e) => e.id === r) || Q[0];
	return /* @__PURE__ */ c(qe.Provider, {
		value: {
			theme: r,
			setTheme: a,
			currentThemeConfig: o,
			availableThemes: Q
		},
		children: /* @__PURE__ */ c(Ge, { children: e })
	});
}
function Ye() {
	return r(qe) || {
		theme: "linear",
		setTheme: () => {},
		currentThemeConfig: Q[0],
		availableThemes: Q
	};
}
//#endregion
//#region src/components/Avatar.jsx
var Xe = {
	notionists: "notionists",
	bottts: "bottts",
	lorelei: "lorelei",
	critters: "critters",
	moods: "moods",
	"fun-emoji": "fun-emoji",
	"pixel-art": "pixel-art",
	adventurer: "adventurer"
};
function Ze({ seed: e = "jdlc-user", suit: t = "notionists", size: n = 64, radius: r = 50, backgroundColor: i = null } = {}) {
	let a = Xe[t] || "notionists", o = new URLSearchParams({
		seed: encodeURIComponent(e || "jdlc-user"),
		size: n.toString()
	});
	return r != null && o.set("radius", r.toString()), i && o.set("backgroundColor", i.replace("#", "")), `https://api.dicebear.com/10.x/${a}/svg?${o.toString()}`;
}
var Qe = {
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
}, $e = {
	circle: "rounded-full",
	rounded: "rounded-xl",
	square: "rounded-none"
}, et = {
	online: "bg-emerald-500",
	busy: "bg-rose-500",
	away: "bg-amber-500",
	offline: "bg-slate-500"
};
function tt({ seed: e, name: t, src: n, suit: r = "notionists", size: i = "md", shape: a = "circle", status: o, className: u, alt: d, ...f }) {
	let [p, m] = s(!1), h = Qe[i] || Qe.md, g = $e[a] || $e.circle, _ = (t || e || "U").toString().trim().charAt(0).toUpperCase(), v = n || Ze({
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
		}), o && et[o] && /* @__PURE__ */ c("span", {
			className: X("absolute bottom-0 right-0 rounded-full ring-[var(--bg-surface)]", h.status, et[o]),
			"aria-label": `Status: ${o}`
		})]
	});
}
function nt({ children: t, max: n = 4, size: r = "sm", className: i }) {
	let a = e.Children.toArray(t), o = a.slice(0, n), s = a.length - n, u = Qe[r] || Qe.sm;
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
//#region src/components/Dropdown.jsx
function rt({ trigger: e, items: t = [], align: n = "right", className: r }) {
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
//#region src/components/AvatarSelector.jsx
function it({ className: e, align: t = "right", seed: n = "jdlc-user" }) {
	let { suit: r, setSuit: i, availableSuits: a, currentSuitConfig: o } = Ke(), s = a.map((e) => ({
		label: e.name,
		active: e.id === r,
		onClick: () => i(e.id),
		icon: () => /* @__PURE__ */ c(tt, {
			seed: n,
			suit: e.id,
			size: "xs",
			className: "w-4 h-4 text-[8px] shrink-0"
		})
	})), u = /* @__PURE__ */ l("button", {
		type: "button",
		className: X("flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[var(--bg-subtle)] hover:bg-[var(--bg-hover)] border border-[var(--border-subtle)] text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors cursor-pointer", e),
		title: `Active Avatar Set: ${o.name}`,
		children: [
			/* @__PURE__ */ c(tt, {
				seed: n,
				suit: o.id,
				size: "xs",
				className: "w-4 h-4 text-[8px] shrink-0"
			}),
			/* @__PURE__ */ c("span", {
				className: "font-semibold whitespace-nowrap",
				children: o.name
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
	return /* @__PURE__ */ c(rt, {
		trigger: u,
		items: s,
		align: t
	});
}
//#endregion
//#region src/components/Button.jsx
function at({ children: e, className: t, variant: n = "default", size: r = "md", disabled: i = !1, isLoading: a = !1, onClick: o, type: s = "button", icon: u, ...d }) {
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
function ot({ children: e, className: t, hover: n = !0, ...r }) {
	return /* @__PURE__ */ c("div", {
		className: X("bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-4 shadow-sm transition-all duration-200", n && "hover:border-[var(--border-medium)] hover:shadow-md hover:bg-[var(--bg-elevated)]", t),
		...r,
		children: e
	});
}
function st({ children: e, className: t, ...n }) {
	return /* @__PURE__ */ c("div", {
		className: X("flex items-center justify-between gap-2 mb-3", t),
		...n,
		children: e
	});
}
function ct({ children: e, className: t, ...n }) {
	return /* @__PURE__ */ c("h3", {
		className: X("font-semibold text-[var(--text-main)] text-sm tracking-tight", t),
		...n,
		children: e
	});
}
function lt({ children: e, className: t, ...n }) {
	return /* @__PURE__ */ c("p", {
		className: X("text-xs text-[var(--text-dim)] mt-0.5", t),
		...n,
		children: e
	});
}
function ut({ children: e, className: t, ...n }) {
	return /* @__PURE__ */ c("div", {
		className: X("text-sm text-[var(--text-muted)]", t),
		...n,
		children: e
	});
}
function dt({ children: e, className: t, ...n }) {
	return /* @__PURE__ */ c("div", {
		className: X("flex items-center justify-end gap-2 mt-4 pt-3 border-t border-[var(--border-subtle)]", t),
		...n,
		children: e
	});
}
//#endregion
//#region src/components/Badge.jsx
function $({ children: e, className: t, variant: n = "default", size: r = "md", dot: i = !1, ...a }) {
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
function ft({ className: e, type: t = "text", label: n, id: r, error: i, helperText: a, icon: o, ...s }) {
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
function pt({ className: e, label: t, id: n, error: r, helperText: i, rows: a = 3, ...o }) {
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
function mt({ className: e, label: t, id: n, error: r, helperText: i, children: a, icon: o, ...s }) {
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
function ht({ isOpen: e, onClose: t, title: n, description: r, subtitle: a, icon: o, headerAction: s, ariaLabel: u, children: d, maxWidth: f = "max-w-lg", className: p }) {
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
//#region src/components/Tabs.jsx
function gt({ tabs: e = [], activeTab: t, onChange: n, className: r }) {
	return /* @__PURE__ */ c("div", {
		className: X("inline-flex items-center p-1 bg-[var(--bg-subtle)] border border-[var(--border-subtle)] rounded-lg", r),
		children: e.map((e) => {
			let r = t === e.id, i = e.icon;
			return /* @__PURE__ */ l("button", {
				type: "button",
				onClick: () => n(e.id),
				title: e.label,
				className: X("flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium rounded-md transition-all duration-150 cursor-pointer select-none", r ? "bg-[var(--bg-elevated)] text-[var(--text-main)] shadow-sm border border-[var(--border-medium)]" : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-hover)]/60 font-medium"),
				children: [
					i && /* @__PURE__ */ c(i, { className: "w-3.5 h-3.5 shrink-0" }),
					/* @__PURE__ */ c("span", {
						className: X(e.hideLabelOnMobile && "hidden lg:inline"),
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
function _t({ className: e, align: t = "right" }) {
	let { theme: n, setTheme: r, availableThemes: i, currentThemeConfig: a } = Ye(), o = i.map((e) => ({
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
				className: "font-semibold whitespace-nowrap",
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
	return /* @__PURE__ */ c(rt, {
		trigger: s,
		items: o,
		align: t
	});
}
//#endregion
//#region src/lib/suiteUtils.js
var vt = [
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
	},
	{
		id: "bandido",
		name: "Bandido",
		description: "Band CRM, Setlists & Stage Engine",
		badge: "Music",
		color: "#F59E0B"
	}
];
function yt(e) {
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
		bandido: 5176,
		main: 5170
	}[e] || 5173}` : t.includes("jdlc.se") ? e === "main" ? "https://jdlc.se" : `https://${e}.jdlc.se` : `https://${e}.${t}`;
}
//#endregion
//#region src/components/AppSwitcher.jsx
function bt({ currentApp: e = "taskflow", className: t, align: n = "left" }) {
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
			case "tripplanner": return /* @__PURE__ */ c("svg", {
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
			case "bandido": return /* @__PURE__ */ c("svg", {
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2",
				className: "w-4 h-4",
				children: /* @__PURE__ */ c("path", {
					strokeLinecap: "round",
					strokeLinejoin: "round",
					d: "M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66V6.5m-8.368 4.755v5.06a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66V9.75"
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
	}, p = vt.filter((t) => t.id !== e);
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
					}), /* @__PURE__ */ c($, {
						variant: d ? "subtle" : "primary",
						size: "xs",
						className: "font-mono text-[9px]",
						children: d ? "Localhost" : "Cloud"
					})]
				}),
				/* @__PURE__ */ c("div", {
					className: "space-y-1",
					children: p.map((e) => {
						let t = yt(e.id);
						return /* @__PURE__ */ l("a", {
							href: t,
							onClick: () => a(!1),
							className: "flex items-center gap-3 p-2 rounded-xl transition-all hover:bg-[var(--bg-hover)] border border-transparent hover:border-[var(--border-subtle)] cursor-pointer text-[var(--text-muted)] hover:text-[var(--text-main)]",
							children: [/* @__PURE__ */ c("div", {
								className: "w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0 shadow-sm",
								style: { backgroundColor: e.color },
								children: f(e.id)
							}), /* @__PURE__ */ l("div", {
								className: "flex-1 min-w-0",
								children: [/* @__PURE__ */ l("div", {
									className: "flex items-center justify-between gap-1.5",
									children: [/* @__PURE__ */ c("span", {
										className: "text-xs font-bold tracking-tight text-[var(--text-main)] font-[var(--font-heading)] truncate",
										children: e.name
									}), /* @__PURE__ */ c("span", {
										className: "text-[10px] text-slate-500 font-mono",
										children: d ? `:${t.split(":").pop()}` : "open ↗"
									})]
								}), /* @__PURE__ */ c("p", {
									className: "text-[10px] text-slate-400 truncate mt-0.5",
									children: e.description
								})]
							})]
						}, e.id);
					})
				}),
				/* @__PURE__ */ l("div", {
					className: "mt-2 pt-1.5 border-t border-[var(--border-subtle)] px-2.5 flex items-center justify-between text-[10px] text-slate-400",
					children: [/* @__PURE__ */ c("span", { children: "JDLC Ecosystem" }), /* @__PURE__ */ c("a", {
						href: yt("main"),
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
var xt = t(null);
function St({ children: e, position: t = "bottom-right" }) {
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
	return /* @__PURE__ */ l(xt.Provider, {
		value: d,
		children: [e, /* @__PURE__ */ c("div", {
			className: X("fixed z-50 pointer-events-none flex flex-col gap-2 p-4 max-w-sm w-full", f[t] || f["bottom-right"]),
			children: r.map((e) => /* @__PURE__ */ c(wt, {
				item: e,
				onDismiss: () => o(e.id)
			}, e.id))
		})]
	});
}
function Ct() {
	return r(xt) || {
		show: (e) => console.log("[Toast]", e),
		success: (e) => console.log("[Toast Success]", e),
		error: (e) => console.error("[Toast Error]", e),
		warning: (e) => console.warn("[Toast Warning]", e),
		info: (e) => console.info("[Toast Info]", e),
		dismiss: () => {}
	};
}
function wt({ item: e, onDismiss: t }) {
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
function Tt({ isOpen: e, onClose: t, placeholder: n = "Type a command or search...", sections: r = [], currentApp: u = "taskflow", enableSuiteShortcuts: d = !0 }) {
	let [f, p] = s(""), [m, h] = s(0), g = o(null), _ = o([]);
	i(() => {
		e && (p(""), h(0), setTimeout(() => {
			g.current?.focus();
		}, 50));
	}, [e]);
	let v = a(() => d ? {
		id: "suite-apps",
		heading: "JDLC Cloud Suite",
		items: vt.filter((e) => e.id !== u).map((e) => ({
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
				let t = yt(e.id);
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
									children: [e.badge && /* @__PURE__ */ c($, {
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
//#region src/components/UserMenu.jsx
function Et({ user: e, displayName: t, avatarSeed: n, avatarSuit: r = null, status: a = "online", onSignIn: u, onSignOut: d, onOpenProfile: f, onOpenGuide: p, onStartTour: m, onOpenApiKey: h, onOpenAbout: g, aboutLabel: _ = "About App", appItems: v = [], extraMenuItems: y = [], className: b, align: x = "right" }) {
	let [S, C] = s(!1), w = o(null), { currentThemeConfig: T } = Ye(), { suit: ee } = Ke(), E = r || ee || "notionists";
	i(() => {
		function e(e) {
			w.current && !w.current.contains(e.target) && C(!1);
		}
		return S && document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [S]);
	let D = t || e?.user_metadata?.displayName || e?.email?.split("@")[0] || "Guest User", te = e?.email || "Local Offline Session", O = n || e?.email || D || "guest", k = !!e, A = [...v, ...y];
	return /* @__PURE__ */ l("div", {
		className: X("relative inline-block text-left", b),
		ref: w,
		children: [/* @__PURE__ */ l("button", {
			type: "button",
			onClick: () => C((e) => !e),
			className: X("flex items-center gap-1.5 sm:gap-2 p-1 sm:pl-1.5 sm:pr-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-main)] hover:border-[var(--border-medium)] hover:bg-[var(--bg-hover)] transition-all cursor-pointer", S && "border-[var(--border-medium)] bg-[var(--bg-elevated)]"),
			title: k ? `Signed in as ${D}` : "Account & Preferences",
			"aria-expanded": S,
			children: [
				/* @__PURE__ */ c(tt, {
					seed: O,
					name: D,
					suit: E,
					size: "xs",
					status: k ? a : void 0
				}),
				/* @__PURE__ */ c("span", {
					className: "text-xs font-semibold max-w-[110px] truncate hidden sm:inline-block",
					children: D
				}),
				/* @__PURE__ */ c("svg", {
					viewBox: "0 0 20 20",
					fill: "currentColor",
					className: X("w-3.5 h-3.5 text-slate-400 transition-transform duration-150 hidden sm:block", S && "rotate-180"),
					children: /* @__PURE__ */ c("path", {
						fillRule: "evenodd",
						d: "M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z",
						clipRule: "evenodd"
					})
				})
			]
		}), S && /* @__PURE__ */ l("div", {
			className: X("absolute z-50 mt-2 w-76 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-medium)] p-3 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150", x === "right" ? "right-0" : "left-0"),
			children: [
				/* @__PURE__ */ l("div", {
					className: "flex items-center gap-3 p-2 bg-[var(--bg-elevated)]/80 rounded-xl border border-[var(--border-subtle)] mb-2",
					children: [/* @__PURE__ */ c(tt, {
						seed: O,
						name: D,
						suit: E,
						size: "md",
						status: k ? a : void 0
					}), /* @__PURE__ */ l("div", {
						className: "flex-1 min-w-0",
						children: [/* @__PURE__ */ l("div", {
							className: "flex items-center justify-between gap-1",
							children: [/* @__PURE__ */ c("span", {
								className: "font-bold text-xs text-[var(--text-main)] truncate font-[var(--font-heading)]",
								children: D
							}), /* @__PURE__ */ c($, {
								variant: k ? "success" : "subtle",
								size: "xs",
								className: "font-mono text-[9px] py-0 px-1",
								children: k ? "Connected" : "Guest"
							})]
						}), /* @__PURE__ */ c("p", {
							className: "text-[11px] text-[var(--text-dim)] truncate mt-0.5",
							children: te
						})]
					})]
				}),
				/* @__PURE__ */ l("div", {
					className: "px-2 py-1.5 flex items-center justify-between text-xs border-b border-[var(--border-subtle)]",
					children: [/* @__PURE__ */ c("span", {
						className: "text-[var(--text-muted)] font-medium",
						children: "Theme"
					}), /* @__PURE__ */ c(_t, { align: "right" })]
				}),
				/* @__PURE__ */ l("div", {
					className: "px-2 py-1.5 flex items-center justify-between text-xs border-b border-[var(--border-subtle)]",
					children: [/* @__PURE__ */ c("span", {
						className: "text-[var(--text-muted)] font-medium",
						children: "Avatar Set"
					}), /* @__PURE__ */ c(it, {
						align: "right",
						seed: O
					})]
				}),
				/* @__PURE__ */ l("div", {
					className: "py-1 space-y-0.5 border-b border-[var(--border-subtle)]",
					children: [
						f && /* @__PURE__ */ l("button", {
							type: "button",
							onClick: () => {
								C(!1), f();
							},
							className: "w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer text-left",
							children: [/* @__PURE__ */ c("svg", {
								viewBox: "0 0 20 20",
								fill: "currentColor",
								className: "w-4 h-4 text-[var(--text-dim)] shrink-0",
								children: /* @__PURE__ */ c("path", { d: "M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" })
							}), /* @__PURE__ */ c("span", { children: "Profile & Settings" })]
						}),
						p && /* @__PURE__ */ l("button", {
							type: "button",
							onClick: () => {
								C(!1), p();
							},
							className: "w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer text-left",
							children: [/* @__PURE__ */ c("svg", {
								viewBox: "0 0 20 20",
								fill: "currentColor",
								className: "w-4 h-4 text-[var(--text-dim)] shrink-0",
								children: /* @__PURE__ */ c("path", {
									fillRule: "evenodd",
									d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
									clipRule: "evenodd"
								})
							}), /* @__PURE__ */ c("span", { children: "Handbook & Guide" })]
						}),
						m && /* @__PURE__ */ l("button", {
							type: "button",
							onClick: () => {
								C(!1), m();
							},
							className: "w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer text-left",
							children: [/* @__PURE__ */ c("svg", {
								viewBox: "0 0 20 20",
								fill: "currentColor",
								className: "w-4 h-4 text-emerald-400 shrink-0",
								children: /* @__PURE__ */ c("path", { d: "M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" })
							}), /* @__PURE__ */ c("span", { children: "Interactive Tour" })]
						}),
						h && /* @__PURE__ */ l("button", {
							type: "button",
							onClick: () => {
								C(!1), h();
							},
							className: "w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer text-left",
							children: [/* @__PURE__ */ c("svg", {
								viewBox: "0 0 20 20",
								fill: "currentColor",
								className: "w-4 h-4 text-amber-400 shrink-0",
								children: /* @__PURE__ */ c("path", {
									fillRule: "evenodd",
									d: "M8 7a5 5 0 113.61 4.804l-1.903 1.903A1 1 0 019 14H8v1a1 1 0 01-1 1H6v1a1 1 0 01-1 1H3a1 1 0 01-1-1v-2a1 1 0 01.293-.707l5.903-5.903A5 5 0 018 7zm2-3a3 3 0 100 6 3 3 0 000-6z",
									clipRule: "evenodd"
								})
							}), /* @__PURE__ */ c("span", { children: "API Key Generator" })]
						})
					]
				}),
				A.length > 0 && /* @__PURE__ */ c("div", {
					className: "py-1 space-y-0.5 border-b border-[var(--border-subtle)]",
					children: A.map((e, t) => /* @__PURE__ */ l("button", {
						type: "button",
						onClick: () => {
							C(!1), e.onClick?.();
						},
						className: X("w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer text-left", e.danger ? "text-rose-400 hover:bg-rose-500/10" : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-hover)]"),
						children: [e.icon && /* @__PURE__ */ c("span", {
							className: "w-4 h-4 shrink-0 text-[var(--text-dim)]",
							children: e.icon
						}), /* @__PURE__ */ c("span", {
							className: "truncate",
							children: e.label
						})]
					}, t))
				}),
				g && /* @__PURE__ */ c("div", {
					className: "py-1 border-b border-[var(--border-subtle)]",
					children: /* @__PURE__ */ l("button", {
						type: "button",
						onClick: () => {
							C(!1), g();
						},
						className: "w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer text-left",
						children: [/* @__PURE__ */ c("svg", {
							viewBox: "0 0 20 20",
							fill: "currentColor",
							className: "w-4 h-4 text-sky-400 shrink-0",
							children: /* @__PURE__ */ c("path", {
								fillRule: "evenodd",
								d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
								clipRule: "evenodd"
							})
						}), /* @__PURE__ */ c("span", { children: _ })]
					})
				}),
				/* @__PURE__ */ c("div", {
					className: "pt-1.5",
					children: k ? /* @__PURE__ */ l("button", {
						type: "button",
						onClick: () => {
							C(!1), d?.();
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
							C(!1), u?.();
						},
						className: "w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[var(--color-primary-glow)] hover:bg-[var(--color-primary)]/10 transition-colors cursor-pointer",
						children: [/* @__PURE__ */ c("span", { children: "Sign In (Invite Only)" }), /* @__PURE__ */ c("svg", {
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
//#region src/components/AboutAppModal.jsx
function Dt({ isOpen: e, onClose: t, appName: n, appVersion: r = "1.0.0", appSubtitle: i, icon: a, accentColor: o = "text-[var(--color-primary-glow)]" }) {
	return /* @__PURE__ */ c(ht, {
		isOpen: e,
		onClose: t,
		maxWidth: "max-w-lg",
		children: /* @__PURE__ */ l("div", {
			className: "space-y-5",
			children: [
				/* @__PURE__ */ l("div", {
					className: "flex items-start gap-3.5 pb-4 border-b border-[var(--border-subtle)]",
					children: [a ? /* @__PURE__ */ c("div", {
						className: `p-2.5 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-medium)] ${o} shrink-0`,
						children: /* @__PURE__ */ c(a, { className: "w-7 h-7" })
					}) : /* @__PURE__ */ c("div", {
						className: "p-2.5 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-medium)] text-[var(--color-primary-glow)] shrink-0",
						children: /* @__PURE__ */ c("span", {
							className: "text-xl",
							children: "✨"
						})
					}), /* @__PURE__ */ l("div", {
						className: "flex-1 min-w-0",
						children: [
							/* @__PURE__ */ l("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ c("h3", {
									className: "font-bold text-lg text-[var(--text-main)] font-[var(--font-heading)]",
									children: n
								}), /* @__PURE__ */ l($, {
									variant: "subtle",
									size: "xs",
									className: "font-mono",
									children: ["v", r]
								})]
							}),
							i && /* @__PURE__ */ c("p", {
								className: "text-xs text-[var(--text-muted)] mt-0.5",
								children: i
							}),
							/* @__PURE__ */ c("p", {
								className: "text-[11px] text-[var(--text-dim)] mt-1 font-mono",
								children: "Built on React 19 • @jdlc/ui Design System"
							})
						]
					})]
				}),
				/* @__PURE__ */ l("div", {
					className: "rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 space-y-1",
					children: [/* @__PURE__ */ l("div", {
						className: "flex items-center gap-1.5 text-xs font-bold text-amber-300",
						children: [/* @__PURE__ */ c("span", { children: "🔐" }), /* @__PURE__ */ c("span", { children: "Invitation-Only Ecosystem" })]
					}), /* @__PURE__ */ c("p", {
						className: "text-[11px] text-amber-200/90 leading-relaxed",
						children: "JDLC applications are private and strictly invitation-only. Public registrations are permanently disabled. If you need account credentials or additional service permissions, please contact your network administrator."
					})]
				}),
				/* @__PURE__ */ l("div", {
					className: "space-y-2 text-xs text-[var(--text-muted)] leading-relaxed",
					children: [/* @__PURE__ */ l("h4", {
						className: "font-semibold text-[var(--text-main)] flex items-center gap-1.5",
						children: [/* @__PURE__ */ c("span", { children: "🛡️" }), /* @__PURE__ */ c("span", { children: "Zero Tracking & Sovereign Data" })]
					}), /* @__PURE__ */ c("p", { children: "Your activity is never tracked, monetized, or shared with third parties. All network traffic is isolated within private infrastructure or encrypted in-browser before syncing." })]
				}),
				/* @__PURE__ */ l("div", {
					className: "rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] p-3 space-y-1 text-xs",
					children: [
						/* @__PURE__ */ c("div", {
							className: "font-semibold text-[var(--text-main)]",
							children: "JDLC Philosophy"
						}),
						/* @__PURE__ */ c("p", {
							className: "text-[11px] text-[var(--text-dim)] italic",
							children: "“Stop paying without owning.” Self-hosted digital sovereignty and tools designed for high-performance productivity and privacy."
						}),
						/* @__PURE__ */ l("div", {
							className: "pt-2 flex items-center gap-3 text-[11px]",
							children: [
								/* @__PURE__ */ l("a", {
									href: "https://jdlc.se/how-tos",
									target: "_blank",
									rel: "noreferrer",
									className: "text-[var(--color-primary-glow)] hover:underline font-medium inline-flex items-center gap-1",
									children: [/* @__PURE__ */ c("span", { children: "Knowledge Hub & FAQs" }), /* @__PURE__ */ c("span", { children: "↗" })]
								}),
								/* @__PURE__ */ c("span", {
									className: "text-[var(--text-dim)]",
									children: "•"
								}),
								/* @__PURE__ */ l("a", {
									href: "https://jdlc.se/about",
									target: "_blank",
									rel: "noreferrer",
									className: "text-[var(--color-primary-glow)] hover:underline font-medium inline-flex items-center gap-1",
									children: [/* @__PURE__ */ c("span", { children: "About JDLC" }), /* @__PURE__ */ c("span", { children: "↗" })]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ l("div", {
					className: "flex items-center justify-between pt-2 border-t border-[var(--border-subtle)]",
					children: [/* @__PURE__ */ c("span", {
						className: "text-[10px] text-[var(--text-dim)]",
						children: "© 2026 JDLC Suite"
					}), /* @__PURE__ */ c(at, {
						type: "button",
						variant: "ghost",
						size: "sm",
						onClick: t,
						children: "Done"
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/AppHeader.jsx
function Ot({ currentApp: e = "taskflow", appName: t = "Task", appAccent: n = "Flow", subtitle: r, icon: a, badge: o = "JDLC", statusBadge: u, onBrandClick: d, tabs: f, activeTab: p, onTabChange: m, centerContent: h, utilities: g, primaryAction: _, onOpenPalette: v, userMenu: y, showThemeSelector: b = !1, className: x, mobileBottomTabs: S = !1, showMobileDrawer: C = !1 }) {
	let [w, T] = s(!1);
	return i(() => (w ? document.body.style.overflow = "hidden" : document.body.style.overflow = "unset", () => {
		document.body.style.overflow = "unset";
	}), [w]), /* @__PURE__ */ l("header", {
		className: X("sticky top-0 z-30 w-full border-b border-[var(--border-subtle)] bg-[var(--bg-root)]/90 backdrop-blur-md transition-colors duration-200", x),
		children: [/* @__PURE__ */ l("div", {
			className: "w-full px-3 sm:px-4 md:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-3",
			children: [
				/* @__PURE__ */ l("div", {
					className: "flex items-center gap-2 sm:gap-2.5 shrink-0",
					children: [/* @__PURE__ */ c(bt, { currentApp: e }), d ? /* @__PURE__ */ l("button", {
						type: "button",
						onClick: d,
						className: "flex items-center gap-2 sm:gap-2.5 hover:opacity-85 active:scale-[0.98] transition-all focus:outline-none rounded-xl cursor-pointer text-left",
						title: "Go to start page",
						children: [/* @__PURE__ */ c("div", {
							className: "w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white shadow-md shadow-[var(--color-primary)]/20 shrink-0",
							children: a
						}), /* @__PURE__ */ l("div", {
							className: "block min-w-0",
							children: [/* @__PURE__ */ l("div", {
								className: "flex items-center gap-1.5 sm:gap-2",
								children: [
									/* @__PURE__ */ l("span", {
										className: "font-extrabold text-sm sm:text-base md:text-lg tracking-tight font-[var(--font-heading)] text-[var(--text-main)] truncate",
										children: [t, /* @__PURE__ */ c("span", {
											className: "text-[var(--color-primary-glow)]",
											children: n
										})]
									}),
									o && /* @__PURE__ */ c($, {
										variant: "subtle",
										size: "xs",
										className: "hidden sm:inline-flex font-mono uppercase font-bold text-[9px] tracking-wider",
										children: o
									}),
									u
								]
							}), r && /* @__PURE__ */ c("p", {
								className: "text-[11px] text-[var(--text-muted)] hidden lg:block leading-tight mt-0.5",
								children: r
							})]
						})]
					}) : /* @__PURE__ */ l("div", {
						className: "flex items-center gap-2 sm:gap-2.5",
						children: [/* @__PURE__ */ c("div", {
							className: "w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white shadow-md shadow-[var(--color-primary)]/20 shrink-0",
							children: a
						}), /* @__PURE__ */ l("div", {
							className: "block min-w-0",
							children: [/* @__PURE__ */ l("div", {
								className: "flex items-center gap-1.5 sm:gap-2",
								children: [
									/* @__PURE__ */ l("span", {
										className: "font-extrabold text-sm sm:text-base md:text-lg tracking-tight font-[var(--font-heading)] text-[var(--text-main)] truncate",
										children: [t, /* @__PURE__ */ c("span", {
											className: "text-[var(--color-primary-glow)]",
											children: n
										})]
									}),
									o && /* @__PURE__ */ c($, {
										variant: "subtle",
										size: "xs",
										className: "hidden sm:inline-flex font-mono uppercase font-bold text-[9px] tracking-wider",
										children: o
									}),
									u
								]
							}), r && /* @__PURE__ */ c("p", {
								className: "text-[11px] text-[var(--text-muted)] hidden lg:block leading-tight mt-0.5",
								children: r
							})]
						})]
					})]
				}),
				/* @__PURE__ */ l("div", {
					className: "hidden sm:flex items-center justify-center flex-1 min-w-0 max-w-2xl mx-2",
					children: [f && f.length > 0 && /* @__PURE__ */ c(gt, {
						tabs: f,
						activeTab: p,
						onChange: m
					}), h]
				}),
				/* @__PURE__ */ l("div", {
					className: "flex items-center gap-1.5 sm:gap-2.5 shrink-0",
					children: [
						/* @__PURE__ */ c("div", {
							className: "hidden sm:flex items-center gap-2",
							children: g
						}),
						v && /* @__PURE__ */ l("button", {
							type: "button",
							onClick: v,
							className: "hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--border-medium)] transition-colors cursor-pointer",
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
						_,
						b && /* @__PURE__ */ c("div", {
							className: "hidden md:block",
							children: /* @__PURE__ */ c(_t, { align: "right" })
						}),
						/* @__PURE__ */ c("div", { children: y })
					]
				})
			]
		}), C && w && /* @__PURE__ */ l("div", {
			className: "md:hidden fixed inset-0 z-50 flex justify-end",
			children: [/* @__PURE__ */ c("div", {
				className: "fixed inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200",
				onClick: () => T(!1)
			}), /* @__PURE__ */ l("div", {
				className: "relative w-4/5 max-w-sm h-full bg-[var(--bg-surface)] border-l border-[var(--border-medium)] shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-250",
				children: [
					/* @__PURE__ */ l("div", {
						className: "flex items-center justify-between p-4 border-b border-[var(--border-subtle)] bg-[var(--bg-subtle)]/70",
						children: [/* @__PURE__ */ l("div", {
							className: "flex items-center gap-2.5",
							children: [/* @__PURE__ */ c("div", {
								className: "w-8 h-8 rounded-xl bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white shadow-md shadow-[var(--color-primary)]/20",
								children: a
							}), /* @__PURE__ */ l("span", {
								className: "font-extrabold text-base font-[var(--font-heading)] text-[var(--text-main)]",
								children: [t, /* @__PURE__ */ c("span", {
									className: "text-[var(--color-primary-glow)]",
									children: n
								})]
							})]
						}), /* @__PURE__ */ c("button", {
							type: "button",
							onClick: () => T(!1),
							className: "p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[var(--bg-hover)] transition-colors cursor-pointer",
							"aria-label": "Close menu",
							children: /* @__PURE__ */ c("svg", {
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "2",
								className: "w-5 h-5",
								children: /* @__PURE__ */ c("path", {
									strokeLinecap: "round",
									strokeLinejoin: "round",
									d: "M6 18L18 6M6 6l12 12"
								})
							})
						})]
					}),
					/* @__PURE__ */ l("div", {
						className: "flex-1 overflow-y-auto p-4 space-y-5",
						children: [
							f && f.length > 0 && /* @__PURE__ */ l("div", { children: [/* @__PURE__ */ c("span", {
								className: "text-[10px] font-mono uppercase tracking-wider text-[var(--text-dim)] font-semibold block mb-2 px-1",
								children: "Navigation"
							}), /* @__PURE__ */ c("div", {
								className: "space-y-1",
								children: f.map((e) => {
									let t = p === e.id, n = e.icon;
									return /* @__PURE__ */ l("button", {
										type: "button",
										onClick: () => {
											m?.(e.id), T(!1);
										},
										className: X("w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer text-left", t ? "bg-[var(--color-primary)]/15 text-[var(--color-primary-glow)] font-semibold border border-[var(--color-primary)]/30" : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-elevated)]"),
										children: [/* @__PURE__ */ l("div", {
											className: "flex items-center gap-3",
											children: [n && /* @__PURE__ */ c(n, { className: "w-4 h-4 shrink-0" }), /* @__PURE__ */ c("span", { children: e.label })]
										}), e.count !== void 0 && /* @__PURE__ */ c("span", {
											className: "px-1.5 py-0.5 rounded text-[10px] font-mono bg-[var(--bg-elevated)] text-[var(--text-dim)] border border-[var(--border-subtle)]",
											children: e.count
										})]
									}, e.id);
								})
							})] }),
							g && /* @__PURE__ */ l("div", { children: [/* @__PURE__ */ c("span", {
								className: "text-[10px] font-mono uppercase tracking-wider text-[var(--text-dim)] font-semibold block mb-2 px-1",
								children: "Controls & Tools"
							}), /* @__PURE__ */ c("div", {
								className: "p-2.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)]",
								children: g
							})] }),
							v && /* @__PURE__ */ l("button", {
								type: "button",
								onClick: () => {
									T(!1), v();
								},
								className: "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-main)] hover:border-[var(--border-medium)] transition-colors cursor-pointer",
								children: [/* @__PURE__ */ l("div", {
									className: "flex items-center gap-2.5",
									children: [/* @__PURE__ */ c("svg", {
										viewBox: "0 0 20 20",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "2",
										className: "w-4 h-4 text-slate-400",
										children: /* @__PURE__ */ c("path", {
											strokeLinecap: "round",
											strokeLinejoin: "round",
											d: "M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM19 19l-4.35-4.35"
										})
									}), /* @__PURE__ */ c("span", { children: "Command Palette" })]
								}), /* @__PURE__ */ c("kbd", {
									className: "text-[10px] font-mono opacity-70",
									children: "⌘K"
								})]
							}),
							b && /* @__PURE__ */ l("div", {
								className: "flex items-center justify-between p-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)]",
								children: [/* @__PURE__ */ c("span", {
									className: "text-xs font-medium text-[var(--text-muted)]",
									children: "Theme"
								}), /* @__PURE__ */ c(_t, { align: "right" })]
							})
						]
					}),
					y && /* @__PURE__ */ c("div", {
						className: "p-3 border-t border-[var(--border-subtle)] bg-[var(--bg-subtle)]/50",
						children: y
					})
				]
			})]
		})]
	});
}
//#endregion
//#region src/components/MobileTabBar.jsx
function kt({ tabs: e = [], activeTab: t, onChange: n, className: r }) {
	return !e || e.length === 0 ? null : /* @__PURE__ */ c("nav", {
		"aria-label": "Primary Mobile Navigation",
		className: X("sm:hidden fixed bottom-0 inset-x-0 z-40 bg-[var(--bg-root)]/95 backdrop-blur-md border-t border-[var(--border-subtle)] px-2 pt-1 pb-[max(env(safe-area-inset-bottom,0px),0.35rem)] shadow-lg transition-colors", r),
		children: /* @__PURE__ */ c("div", {
			className: "flex items-center justify-around w-full max-w-md mx-auto",
			children: e.map((e) => {
				let r = t === e.id, i = e.icon;
				return /* @__PURE__ */ l("button", {
					type: "button",
					onClick: () => n?.(e.id),
					"aria-current": r ? "page" : void 0,
					className: X("flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all cursor-pointer select-none text-center min-w-0 relative", r ? "text-[var(--color-primary-glow)] font-semibold" : "text-[var(--text-muted)] hover:text-[var(--text-main)] active:scale-95"),
					children: [
						r && /* @__PURE__ */ c("span", { className: "absolute inset-x-2 inset-y-0.5 rounded-lg bg-[var(--color-primary)]/15 -z-10 animate-in fade-in duration-150" }),
						/* @__PURE__ */ l("div", {
							className: "relative",
							children: [i && /* @__PURE__ */ c(i, { className: "w-5 h-5 shrink-0" }), e.count !== void 0 && /* @__PURE__ */ c("span", {
								className: "absolute -top-1 -right-2 px-1 py-0.2 bg-[var(--color-primary)] text-white text-[9px] font-mono rounded-full font-bold shadow-sm",
								children: e.count
							})]
						}),
						/* @__PURE__ */ c("span", {
							className: "text-[10px] tracking-tight mt-0.5 truncate max-w-full",
							children: e.shortLabel || e.label
						})
					]
				}, e.id);
			})
		})
	});
}
//#endregion
export { Z as AVATAR_SUITS, Dt as AboutAppModal, Ot as AppHeader, bt as AppSwitcher, tt as Avatar, nt as AvatarGroup, Ge as AvatarProvider, it as AvatarSelector, $ as Badge, at as Button, ot as Card, ut as CardContent, lt as CardDescription, dt as CardFooter, st as CardHeader, ct as CardTitle, Tt as CommandPalette, Xe as DICEBEAR_SUITS, ht as Dialog, rt as Dropdown, ft as Input, kt as MobileTabBar, vt as SUITE_APPS, mt as Select, Q as THEMES, gt as Tabs, pt as Textarea, Je as ThemeProvider, _t as ThemeSelector, St as ToastProvider, Et as UserMenu, X as cn, Ze as getDiceBearAvatarUrl, yt as getSuiteAppUrl, Ke as useAvatar, Ye as useTheme, Ct as useToast };
