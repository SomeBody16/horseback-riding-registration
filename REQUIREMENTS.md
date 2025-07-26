# Admin Pages Requirements

## Overview
The admin section provides management capabilities for horseback riding slots and related data. The admin interface is built using Mantine UI components and follows a consistent layout pattern.
No mobile support is required, web page will only be used from browser

## Base Route Structure
- **Base Route**: `/admin`
- **Layout**: App Shell with navigation sidebar
- **Authentication**: Handled externally (not implemented in this scope)

## Layout Structure

### App Shell Layout
- **Navigation**: Left sidebar with navigation buttons
- **Header**: Admin dashboard header
- **Main Content**: Dynamic content area

### Navigation Menu
- **Dashboard**: `/admin` - Overview and statistics (skeleton for now)
- **Slots Management**: `/admin/slots` - Manage riding slots

## Page Specifications

### 1. Admin Dashboard (`/admin`)
**Purpose**: Main admin landing page with overview and statistics

**Content**:
- Welcome message
- Quick statistics cards (skeleton components)
- Recent activity summary
- Navigation shortcuts

**Components**:
- Skeleton statistics cards
- Placeholder charts/graphs
- Quick action buttons

### 2. Slots Management (`/admin/slots`)
**Purpose**: View and manage all available riding slots

**Layout**:
- Page header with title "Manage Slots"
- Create button (positioned above table)
- Data table with slots information

**Table Columns**:
- **ID**: Unique slot identifier
- **Date**: Slot date (formatted as DD/MM/YYYY)
- **Time**: Start time - End time (formatted as HH:MM - HH:MM)
- **Type**: Slot type/category
- **Limit**: Maximum number of participants
- **Actions**: View, Edit, Delete buttons

**Actions**:
- **Create**: Button above table linking to `/admin/slots/create`
- **View**: Navigate to `/admin/slots/[id]`
- **Edit**: Navigate to `/admin/slots/[id]/update`
- **Delete**: Navigate to `/admin/slots/[id]/delete`

### 3. Slot Details (`/admin/slots/[id]`)
**Purpose**: Display detailed information about a specific slot

**Content**:
- Slot ID
- Date and time information
- Type/category
- Participant limit
- Current registrations (if applicable)
- Status information
- Action buttons (Edit, Delete, Back to list)

**Layout**:
- Card-based layout
- Clear information hierarchy
- Action buttons at bottom

### 4. Create Slot (`/admin/slots/create`)
**Purpose**: Create a new riding slot

**Form Fields**:
- Date picker
- Start time picker
- End time picker
- Type selection (dropdown)
- Participant limit (number input)
- Description (optional text area)

**Actions**:
- Save button
- Cancel button (returns to slots list)

### 5. Edit Slot (`/admin/slots/[id]/update`)
**Purpose**: Modify an existing slot

**Form Fields**:
- Pre-populated with current slot data
- Same fields as create form
- Date picker
- Start time picker
- End time picker
- Type selection
- Participant limit
- Description

**Actions**:
- Update button
- Cancel button (returns to slot details)

### 6. Delete Slot (`/admin/slots/[id]/delete`)
**Purpose**: Confirm and delete a slot

**Content**:
- Confirmation dialog
- Slot information summary
- Warning about deletion consequences
- Confirmation message

**Actions**:
- Confirm delete button
- Cancel button (returns to slot details)

## Technical Requirements

### UI Framework
- **Mantine**: Primary UI component library
- **App Shell**: Main layout component
- **Data Table**: For slots listing
- **Forms**: For create/edit operations
- **Modals**: For delete confirmations

### Server Actions
All server actions should be placed in the `src/action/` directory and follow these patterns:

#### Action Structure
- Use `"use server"` directive at the top of each action file
- Export async functions that handle form submissions
- Use Prisma client for database operations
- Implement proper error handling with redirects
- Follow TypeScript strict typing

#### Required Actions
- **`src/action/slots.ts`**: Handle slot CRUD operations
  - `createSlot(formData: FormData)`: Create new slot
  - `updateSlot(id: string, formData: FormData)`: Update existing slot
  - `deleteSlot(id: string)`: Delete slot with confirmation
  - `getSlots()`: Fetch all slots for listing
  - `getSlot(id: string)`: Fetch single slot details

#### Action File Structure
```
src/action/
├── slots.ts          # Slot CRUD operations
├── admin.ts          # Admin-specific actions (future)
└── handleRegistration.ts  # Existing registration action
```

#### Action Function Signatures
```typescript
// Slot management actions
export const createSlot = async (formData: FormData): Promise<void>
export const updateSlot = async (id: string, formData: FormData): Promise<void>
export const deleteSlot = async (id: string): Promise<void>
export const getSlots = async (): Promise<Slot[]>
export const getSlot = async (id: string): Promise<Slot | null>
```

#### Action Patterns
```typescript
"use server";

import { PrismaClient } from "@/prisma/generated";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

// Error handling helper
const errorRedirect = (error: string) => {
  return redirect(`/admin/error/${error}`);
};

// Form data parsing helper
const parseSlotFormData = (formData: FormData) => {
  const date = formData.get("date") as string;
  const startTime = formData.get("startTime") as string;
  const endTime = formData.get("endTime") as string;
  const type = formData.get("type") as string;
  const limit = parseInt(formData.get("limit") as string, 10);
  const description = formData.get("description") as string;

  if (!date || !startTime || !endTime || !type || isNaN(limit)) {
    throw new Error("Missing required fields");
  }

  return { date, startTime, endTime, type, limit, description };
};

export const createSlot = async (formData: FormData) => {
  try {
    const slotData = parseSlotFormData(formData);
    
    await prisma.slot.create({
      data: slotData,
    });

    redirect("/admin/slots?success=created");
  } catch (error) {
    errorRedirect("invalid-data");
  }
};
```

#### Form Integration
- Use `action={createSlot}` in form components
- Handle loading states with `useFormStatus` hook
- Display validation errors using `useFormState` hook
- Implement optimistic updates where appropriate

#### Error Handling
- Use consistent error redirects: `/admin/error/{error-code}`
- Common error codes: `invalid-data`, `not-found`, `unauthorized`, `server-error`
- Implement proper validation before database operations
- Log errors for debugging while showing user-friendly messages

#### Validation Patterns
- Validate required fields in form data parsing
- Check data types and ranges (e.g., positive numbers for limits)
- Validate date/time logic (end time after start time)
- Ensure slot doesn't conflict with existing slots
- Check user permissions for admin operations

### Routing
- **Base**: `/admin`
- **Slots**: `/admin/slots`
- **Slot Details**: `/admin/slots/[id]`
- **Create Slot**: `/admin/slots/create`
- **Edit Slot**: `/admin/slots/[id]/update`
- **Delete Slot**: `/admin/slots/[id]/delete`

### Data Structure
**Slot Object**:
```typescript
interface Slot {
  id: string;
  date: Date;
  startTime: string;
  endTime: string;
  type: string;
  limit: number;
  description?: string;
}
```

### Responsive Design
- Mobile-first approach
- Collapsible navigation on smaller screens
- Responsive table layout
- Touch-friendly buttons and interactions

### Accessibility
- Proper ARIA labels
- Keyboard navigation support
- Screen reader compatibility
- High contrast support

## Future Enhancements
- Statistics dashboard with charts
- Bulk operations for slots
- Advanced filtering and search
- Export functionality
- User management (if needed)
- Activity logs
- Notifications system 
