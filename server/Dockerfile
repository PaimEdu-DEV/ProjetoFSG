FROM mcr.microsoft.com/dotnet/sdk:9.0

ENV DOTNET_CLI_TELEMETRY_OPTOUT=1 \
    DOTNET_NOLOGO=1 \
    NUGET_XMLDOC_MODE=skip \
    DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y --no-install-recommends curl ca-certificates python3 python3-pip gnupg && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y --no-install-recommends nodejs && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Pre-warm the .NET SDK cache during the image build so the first
# code submission from a user isn't the one paying for a cold restore.
RUN mkdir -p /tmp/warmup && \
    printf '<Project Sdk="Microsoft.NET.Sdk"><PropertyGroup><OutputType>Exe</OutputType><TargetFramework>net9.0</TargetFramework><InvariantGlobalization>true</InvariantGlobalization></PropertyGroup></Project>' > /tmp/warmup/run.csproj && \
    printf 'System.Console.WriteLine(1);' > /tmp/warmup/Program.cs && \
    dotnet run --project /tmp/warmup -c Release && \
    rm -rf /tmp/warmup

EXPOSE 4000

CMD ["node", "index.js"]
