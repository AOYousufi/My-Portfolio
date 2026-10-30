// A single place to format contact drafts for email clients.
export const CONTACT_EMAIL = 'ozairyousufi1400@gmail.com'

export function buildContactMailto({ name, email, message }) {
  const senderName = name.trim()
  const senderEmail = email.trim()
  const messageText = message.trim()
  const subject = encodeURIComponent(`Portfolio enquiry from ${senderName}`)
  const body = encodeURIComponent(
    `Hi Ahmad,\n\n${messageText}\n\nBest regards,\n${senderName}\n${senderEmail}`
  )

  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
}
