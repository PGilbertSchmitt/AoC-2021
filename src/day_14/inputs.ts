export type Rules = Map<string, string>;

export interface Input {
  template: string,
  rules: Rules;
}

const transform = (input: string) => {
  const [template, ruleList] = input.trim().split('\n\n');
  const rules = new Map<string, string>();
  for (const rule of ruleList.split('\n')) {
    const [pair, insert] = rule.split(' -> ');
    rules.set(pair, insert);
  }
  return {
    template,
    rules
  };
};

export const sample = transform(`NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`);

export const input = transform(`CBNBOKHVBONCPPBBCKVH

FK -> O
BK -> B
PB -> N
VS -> P
OF -> H
KP -> K
PS -> K
OV -> N
FO -> H
KN -> P
HF -> K
BV -> N
OO -> B
KC -> V
CK -> H
BC -> P
VV -> S
NS -> C
SF -> O
BN -> V
NH -> N
VP -> F
KH -> S
BO -> N
VN -> K
BB -> H
CH -> H
HP -> O
KK -> O
CB -> S
VC -> P
FH -> B
SP -> C
NF -> O
HN -> N
PO -> P
PP -> C
SO -> F
FB -> B
SB -> B
SC -> B
HK -> O
BF -> V
OB -> B
NC -> V
HC -> F
KO -> C
NV -> C
HB -> H
FP -> S
OS -> O
HH -> K
OK -> B
OH -> C
NP -> V
SN -> H
SK -> B
HV -> F
VF -> P
CP -> H
FN -> H
FV -> B
CN -> H
OC -> O
KV -> P
CF -> B
OP -> B
FC -> O
PC -> B
CV -> S
PV -> H
VK -> N
SS -> C
HO -> F
VH -> C
NB -> S
NN -> F
FF -> K
CC -> H
SV -> H
CO -> K
BP -> O
SH -> H
KS -> K
FS -> F
PF -> S
BS -> H
VO -> H
NK -> F
PK -> B
KB -> K
CS -> C
VB -> V
BH -> O
KF -> N
HS -> H
PH -> K
ON -> H
PN -> K
NO -> S`);