create table "public"."beers" (
    "nfc_id" text not null,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."beers" enable row level security;

create table "public"."players" (
    "nfc_id" text not null,
    "created_at" timestamp with time zone not null default now(),
    "name" text not null
);


alter table "public"."players" enable row level security;

CREATE UNIQUE INDEX beers_pkey ON public.beers USING btree (nfc_id, created_at);

CREATE UNIQUE INDEX players_pkey ON public.players USING btree (nfc_id);

alter table "public"."beers" add constraint "beers_pkey" PRIMARY KEY using index "beers_pkey";

alter table "public"."players" add constraint "players_pkey" PRIMARY KEY using index "players_pkey";

alter table "public"."beers" add constraint "beers_nfc_id_fkey" FOREIGN KEY (nfc_id) REFERENCES players(nfc_id) not valid;

alter table "public"."beers" validate constraint "beers_nfc_id_fkey";



