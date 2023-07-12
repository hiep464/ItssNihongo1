// constants for language
export const VIETNAMESE = "Vietnamese"
export const ENGLISH = "English"
export const JAPANESE = "Japanese"
export const FRENCH = "French"
export const SPANISH = "Spanish"
export const CHINESE = "Chinese"

export const nationalities = [
    { id: 1, value: VIETNAMESE },
    { id: 2, value: ENGLISH },
    { id: 3, value: JAPANESE },
    { id: 4, value: FRENCH },
    { id: 5, value: SPANISH },
    { id: 6, value: CHINESE },
]
// constants for want_to
export const CHILD_CARE = "ChildCare"
export const COOKING = "Cooking"
export const BOTH = "Cooking and ChildCare"

export const want_to = [
    { id: "target_find_child_care", label: "赤ちゃんの世話や料理をしてくれる人を探したい", value: CHILD_CARE },
    { id: "target_find_cooking", label: "赤ちゃんに料理を作ってくれる人を探したい", value: COOKING },
    { id: "target_find_both", label: "両方", value: BOTH },
]

// constants for gender
export const MALE = "male";
export const FEMALE = "female"
export const OTHER = "other"

export const genders = [
    { id: 'gender-male-label-id', label: '男', value: MALE },
    { id: 'gender-female-label-id', label: '女', value: FEMALE },
    { id: 'gender-other-label-id', label: '他', value: OTHER }
]


