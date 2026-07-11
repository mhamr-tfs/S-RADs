This document specifies design requirements for the shuttle system

CUSTOMER EXPERIENCE
Customer should be able to call or visit our website via browser or pre established QR code to go to the shuttle form.  Fill out the form and pay as applicable
Customer is notified (via e-mail or SMS) that the shuttle request is completed
Customer leaves vehicle at drop off location and floats the river
When shuttle is completed customer gets notification (via e-mail or SMS) that the shuttle is done
Customer is able to pick up the vehicle at the take out point


STAFF WORKFLOW
Staff recieves shuttle request along with payment information
Staff travels to shuttle pick up point 
Staff moves the customer vehicle to take out location
Staff marks shuttle complete

BUSINESS RULES
Shuttles are from specific point to point
All shuttles are paid for via Square or Cash unless they are (A) guests of Two Rivers Inn that have booked with us directly in which case they are intitled to one free shuttle/night stayed at the motel or  (B) A guide working a float trip for the company. 

DATABASE DESIGN
Database design should inculde the following:  
Customer information
Vehicle information
Put-in and take out times and date
Time/date shuttle was requested
Put-in/Take out locations
Payment type 
Vehicle picture (future)
Is guide (Y/N)
Is direct pay Motel guest (Y/N)


PAYNMENT RULES
Square (for credit card oayments)
Cash
Free if motel guest/guide

FUTURE ENHANCEMENTS
Guide module
vehicle photos
SMS integration for shuttle notifications (staff side)/delivery notification (customer side) 
Reports
APK/iOS app for staff
Windows app for shop computer (maybe)

VERSION NUMBERS
Version 1.0
Replace Forms.ai
Version 1 is complete when:

✓ Customer can request shuttle.

✓ Customer can pay with Square.

✓ Customer can choose cash.

✓ Qualified Two Rivers guests are automatically free.

✓ Reservation appears on dispatcher dashboard.

✓ Dispatcher assigns shuttle.

✓ Dispatcher marks completed.

✓ Customer receives confirmation.

✓ Customer receives completion notification.

✓ Forms.ai is no longer needed.

Version 1.5
Reporting

Version 2.0

Guide Module

Version 3.0

Operations Dashboard


FUTURE INTEGRATIONS

Brindle Chute
Purpose:
Guide scheduling

Future Integration:
Guide trips automatically create shuttle requests.

Square
Purpose:
Payment processing

Website
Purpose:
Customer portal

Email / SMS
Purpose:
Notifications
