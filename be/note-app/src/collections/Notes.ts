import { CollectionConfig } from "payload/types";

const Notes: CollectionConfig = {
  slug: "notes",
  auth: false,
  admin: {
    useAsTitle: "email",
  },
  access: {
    create: () => true,
    update: () => true,
  },
  fields: [
    {
      name: "UserID",
      type: "relationship",
      relationTo: "users",
    },
    {
      name: "content",
      type: "text",
    },
  ],
};

export default Notes;
