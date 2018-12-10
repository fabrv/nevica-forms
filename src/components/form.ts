export class Question{
  DATE_CREATED: string
  FORM_NAME: string
  OPTION_CAPTION: any
  OPTION_VALUE: any
  QUESTION: string
  QUESTION_ID: number
  TYPE_ID: number
}

export class Form{
  FORM_NAME: string
  DATE_CREATED: string
  CODE: number
  QUESTIONS: any
  FINISHED_DATE: string
  LAST_SLIDE: number
  FILLED_NO: number
}