// Google Apps Script - Backend for Elevated Home Resets
// Deploy as a web app accessible to "anyone"

// Spreadsheet to store bookings and forms
const SPREADSHEET_ID = "YOUR_SPREADSHEET_ID"; // Replace with your Google Sheet ID

// Handle GET and POST requests
function doGet(e) {
  const action = e.parameter.action;

  if (action === "bookings") {
    const year = parseInt(e.parameter.year);
    const month = parseInt(e.parameter.month);
    const unavailable = getUnavailableDates(year, month);
    return ContentService.createTextOutput(JSON.stringify({
      unavailable: unavailable
    })).setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput("Invalid request").setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const action = e.parameter.action;
  const payload = JSON.parse(e.postData.contents);

  if (action === "bookings/confirm") {
    return handleBookingConfirm(payload);
  }

  if (action === "contact") {
    return handleContactForm(payload);
  }

  return ContentService.createTextOutput(JSON.stringify({
    success: false,
    error: "Invalid action"
  })).setMimeType(ContentService.MimeType.JSON);
}

// Handle booking confirmation
function handleBookingConfirm(data) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const bookingsSheet = ss.getSheetByName("Bookings");

    if (!bookingsSheet) {
      throw new Error("Bookings sheet not found");
    }

    // Add booking to sheet
    bookingsSheet.appendRow([
      new Date(),
      data.name,
      data.email,
      data.phone,
      data.service,
      data.date,
      data.time || "8:00 AM",
      data.amount || 0,
      data.notes || "",
      "pending"
    ]);

    // Send confirmation email
    MailApp.sendEmail(
      data.email,
      "Booking Confirmation - Elevated Home Resets",
      `Thank you for booking with us!\n\nService: ${data.service}\nDate: ${data.date}\n\nWe will confirm your booking within 24 hours.`
    );

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: "Booking confirmed"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("Error: " + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle contact form
function handleContactForm(data) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const contactSheet = ss.getSheetByName("Contact Forms");

    if (contactSheet) {
      contactSheet.appendRow([
        new Date(),
        data.name,
        data.email,
        data.phone,
        data.service,
        data.message,
        "new"
      ]);
    }

    // Send confirmation email to customer
    MailApp.sendEmail(
      data.email,
      "We received your message - Elevated Home Resets",
      `Thank you for reaching out!\n\nWe'll get back to you within 24 hours.\n\nBest regards,\nElevated Home Resets Team`
    );

    // Send notification to business email
    MailApp.sendEmail(
      "contact@elevatedhomeresets.com", // Replace with your email
      "New Contact Form Submission",
      `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nService: ${data.service}\n\nMessage:\n${data.message}`
    );

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: "Message sent successfully"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("Error: " + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Get unavailable dates for a given month
function getUnavailableDates(year, month) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const bookingsSheet = ss.getSheetByName("Bookings");

    if (!bookingsSheet) {
      return [];
    }

    const data = bookingsSheet.getDataRange().getValues();
    const unavailable = [];

    // Iterate through bookings and collect dates in this month
    for (let i = 1; i < data.length; i++) {
      const dateStr = data[i][5]; // Date column
      if (dateStr) {
        const bookingDate = new Date(dateStr);
        if (bookingDate.getFullYear() === year && (bookingDate.getMonth() + 1) === month) {
          const iso = bookingDate.toISOString().split('T')[0];
          if (!unavailable.includes(iso)) {
            unavailable.push(iso);
          }
        }
      }
    }

    return unavailable;
  } catch (error) {
    Logger.log("Error getting unavailable dates: " + error.toString());
    return [];
  }
}

// Helper to format date as ISO string
function dateToISO(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
