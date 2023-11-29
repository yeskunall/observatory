-- CreateTable
CREATE TABLE "bookmarks" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "bookmarks_pkey" PRIMARY KEY ("id")
);

