export default async function renderAlerts() {
  // Fetch alerts data
  const response = await fetch("/json/alerts.json");
  const alerts = await response.json();

  // If no alerts, do nothing
  if (!alerts || alerts.length === 0) {
    return null;
  }

  // Create the alert container
  const alertSection = document.createElement("section");
  alertSection.classList.add("alert-list");

  // Create each alert message
  alerts.forEach((alert) => {
    const alertMessage = document.createElement("p");
    alertMessage.textContent = alert.message;
    alertMessage.style.backgroundColor = alert.background;
    alertMessage.style.color = alert.color;
    alertSection.appendChild(alertMessage);
  });

  // Return the section so it can be prepended to <main>
  return alertSection;
}
