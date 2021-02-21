FROM hayd/alpine-deno:1.5.2

EXPOSE 8000

WORKDIR /app

USER deno

COPY dep.ts /app

ADD . .

RUN deno cache mod.ts

CMD ["run", "--allow-net", "--allow-read", "mod.ts"]