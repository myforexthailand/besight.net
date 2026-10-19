-- CreateTable
CREATE TABLE `Member` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `externalId` VARCHAR(191) NULL,
    `code` VARCHAR(32) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `displayName` VARCHAR(191) NULL,
    `avatarUrl` TEXT NULL,
    `leaderboardProfileJson` TEXT NULL,
    `email` VARCHAR(191) NULL,
    `passwordHash` VARCHAR(255) NULL,
    `tokenVersion` INTEGER NOT NULL DEFAULT 0,
    `identityVerifiedAt` DATETIME(3) NULL,
    `contactPhone` VARCHAR(32) NULL,
    `contactAddressJson` TEXT NULL,
    `contactUpdatedAt` DATETIME(3) NULL,
    `phone` VARCHAR(64) NULL,
    `country` VARCHAR(96) NULL,
    `address` TEXT NULL,
    `tradingView` VARCHAR(96) NULL,
    `telegramUsername` VARCHAR(96) NULL,
    `telegramUserId` VARCHAR(96) NULL,
    `discordUsername` VARCHAR(96) NULL,
    `discordUserId` VARCHAR(96) NULL,
    `lineUserId` VARCHAR(96) NULL,
    `lineDisplayName` VARCHAR(191) NULL,
    `socialLinksJson` TEXT NULL,
    `joinedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `plan` ENUM('free', 'ib_partner') NOT NULL DEFAULT 'free',
    `primaryTradeAccountId` INTEGER NULL,
    `requiredLotsOverride` DECIMAL(12, 4) NULL,
    `requiredLotsOverrideNote` TEXT NULL,
    `crmStartDate` DATETIME(3) NULL,
    `crmExpiryDate` DATETIME(3) NULL,
    `currentPeriodLots` DECIMAL(18, 8) NOT NULL DEFAULT 0,
    `currentPeriodLotsAt` DATETIME(3) NULL,
    `currentPeriodLotsFrom` DATETIME(3) NULL,
    `currentPeriodLotsTo` DATETIME(3) NULL,
    `customerStageOverride` ENUM('new', 'existing') NULL,

    UNIQUE INDEX `Member_externalId_key`(`externalId`),
    UNIQUE INDEX `Member_code_key`(`code`),
    UNIQUE INDEX `Member_email_key`(`email`),
    UNIQUE INDEX `Member_primaryTradeAccountId_key`(`primaryTradeAccountId`),
    INDEX `Member_joinedAt_idx`(`joinedAt`),
    INDEX `Member_plan_idx`(`plan`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MemberAcquisitionChannel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `memberId` INTEGER NOT NULL,
    `channel` VARCHAR(64) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `MemberAcquisitionChannel_memberId_channel_key`(`memberId`, `channel`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Broker` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(120) NOT NULL,
    `logoUrl` TEXT NULL,
    `code` VARCHAR(32) NOT NULL,
    `url` TEXT NULL,
    `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
    `importMethod` VARCHAR(64) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Broker_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TradeAccount` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `memberId` INTEGER NOT NULL,
    `brokerId` INTEGER NULL,
    `tradeId` VARCHAR(64) NOT NULL,
    `accountType` VARCHAR(64) NULL,
    `partnerIb` VARCHAR(96) NULL,
    `verification` ENUM('verified', 'pending', 'not_found') NOT NULL DEFAULT 'pending',
    `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
    `memberConfirmed` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `lastSyncAt` DATETIME(3) NULL,

    INDEX `TradeAccount_brokerId_tradeId_idx`(`brokerId`, `tradeId`),
    INDEX `TradeAccount_memberId_tradeId_idx`(`memberId`, `tradeId`),
    INDEX `TradeAccount_memberId_status_idx`(`memberId`, `status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TradeLog` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `tradeAccountId` INTEGER NOT NULL,
    `memberId` INTEGER NOT NULL,
    `externalKey` VARCHAR(191) NULL,
    `symbol` VARCHAR(64) NOT NULL,
    `lots` DECIMAL(18, 8) NOT NULL,
    `rebate` DECIMAL(18, 8) NOT NULL DEFAULT 0,
    `campaignName` VARCHAR(191) NULL,
    `country` VARCHAR(96) NULL,
    `tradeDate` DATETIME(3) NOT NULL,
    `source` VARCHAR(64) NOT NULL DEFAULT 'besight_lot_api',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `TradeLog_externalKey_key`(`externalKey`),
    INDEX `TradeLog_memberId_tradeDate_idx`(`memberId`, `tradeDate`),
    INDEX `TradeLog_tradeAccountId_tradeDate_idx`(`tradeAccountId`, `tradeDate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Indicator` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(120) NOT NULL,
    `publicationId` VARCHAR(191) NULL,
    `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
    `eaFileUrl` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Indicator_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlanIndicatorEntitlement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `plan` ENUM('free', 'ib_partner') NOT NULL,
    `indicatorId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `PlanIndicatorEntitlement_plan_indicatorId_key`(`plan`, `indicatorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MemberIndicatorAccess` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `memberId` INTEGER NOT NULL,
    `indicatorId` INTEGER NOT NULL,
    `status` ENUM('active', 'suspended', 'pending', 'expired') NOT NULL DEFAULT 'pending',
    `source` ENUM('Broker', 'Admin', 'SpecialAccess', 'Plan') NOT NULL,
    `startsAt` DATETIME(3) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `lastRenewedAt` DATETIME(3) NULL,
    `manualLock` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `MemberIndicatorAccess_status_expiresAt_idx`(`status`, `expiresAt`),
    UNIQUE INDEX `MemberIndicatorAccess_memberId_indicatorId_key`(`memberId`, `indicatorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RenewalRecord` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `memberId` INTEGER NOT NULL,
    `indicatorId` INTEGER NOT NULL,
    `indicatorAccessId` INTEGER NULL,
    `period` VARCHAR(32) NOT NULL,
    `qualifiedLots` DECIMAL(18, 8) NOT NULL,
    `requiredLots` DECIMAL(18, 8) NOT NULL,
    `renewed` BOOLEAN NOT NULL,
    `origin` VARCHAR(16) NOT NULL DEFAULT 'auto',
    `note` TEXT NULL,
    `oldExpiry` DATETIME(3) NULL,
    `newExpiry` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `RenewalRecord_memberId_indicatorId_period_idx`(`memberId`, `indicatorId`, `period`),
    INDEX `RenewalRecord_period_renewed_idx`(`period`, `renewed`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TelegramAccess` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `memberId` INTEGER NOT NULL,
    `username` VARCHAR(96) NULL,
    `userId` VARCHAR(96) NULL,
    `room` VARCHAR(191) NOT NULL,
    `status` ENUM('active', 'pending', 'expired', 'banned') NOT NULL DEFAULT 'pending',
    `grantedAt` DATETIME(3) NULL,
    `expiresAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `TelegramAccess_memberId_room_key`(`memberId`, `room`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LotCheckRun` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `memberId` INTEGER NULL,
    `tradeAccountId` INTEGER NULL,
    `tradeId` VARCHAR(64) NULL,
    `dateFrom` DATETIME(3) NOT NULL,
    `dateTo` DATETIME(3) NOT NULL,
    `totalLots` DECIMAL(18, 8) NOT NULL DEFAULT 0,
    `qualified` BOOLEAN NOT NULL DEFAULT false,
    `autoProcessed` BOOLEAN NOT NULL DEFAULT false,
    `errorMessage` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `LotCheckRun_tradeId_dateFrom_dateTo_idx`(`tradeId`, `dateFrom`, `dateTo`),
    INDEX `LotCheckRun_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LotCheckResult` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `runId` BIGINT NOT NULL,
    `kind` ENUM('account', 'campaign', 'country', 'excluded_symbol') NOT NULL,
    `campaignName` VARCHAR(191) NULL,
    `loginId` VARCHAR(64) NULL,
    `country` VARCHAR(96) NULL,
    `instrument` VARCHAR(64) NULL,
    `lots` DECIMAL(18, 8) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `LotCheckResult_kind_createdAt_idx`(`kind`, `createdAt`),
    INDEX `LotCheckResult_loginId_idx`(`loginId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ActivityLog` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `memberId` INTEGER NULL,
    `actor` VARCHAR(96) NOT NULL,
    `action` VARCHAR(120) NOT NULL,
    `description` TEXT NOT NULL,
    `notification` BOOLEAN NOT NULL DEFAULT true,
    `notificationReadAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `ActivityLog_createdAt_idx`(`createdAt`),
    INDEX `ActivityLog_memberId_createdAt_idx`(`memberId`, `createdAt`),
    INDEX `ActivityLog_notification_notificationReadAt_createdAt_idx`(`notification`, `notificationReadAt`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(120) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `role` VARCHAR(32) NOT NULL,
    `isOwner` BOOLEAN NOT NULL DEFAULT false,
    `passwordHash` VARCHAR(255) NULL,
    `tokenVersion` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Admin_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SystemSetting` (
    `key` VARCHAR(96) NOT NULL,
    `valueJson` TEXT NOT NULL,
    `description` TEXT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Activity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(64) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `status` ENUM('upcoming', 'live', 'finished') NOT NULL DEFAULT 'upcoming',
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `traders` INTEGER NOT NULL DEFAULT 0,
    `prizePool` DECIMAL(12, 2) NOT NULL DEFAULT 0,
    `coverImage` TEXT NULL,
    `visibleFrom` DATETIME(3) NULL,
    `registrationOpensAt` DATETIME(3) NULL,
    `rules` TEXT NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `published` BOOLEAN NOT NULL DEFAULT true,
    `mode` VARCHAR(16) NOT NULL DEFAULT 'registered',
    `winnersFinalizedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Activity_slug_key`(`slug`),
    INDEX `Activity_published_status_startDate_idx`(`published`, `status`, `startDate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ActivityEnrollment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `activityId` INTEGER NOT NULL,
    `memberId` INTEGER NOT NULL,
    `tradeAccountId` INTEGER NULL,
    `tradeId` VARCHAR(64) NULL,
    `isDemo` BOOLEAN NOT NULL DEFAULT false,
    `verifiedAt` DATETIME(3) NULL,
    `verificationNote` TEXT NULL,
    `lots` DECIMAL(18, 8) NOT NULL DEFAULT 0,
    `lotsAt` DATETIME(3) NULL,
    `lotsFrom` DATETIME(3) NULL,
    `lotsTo` DATETIME(3) NULL,
    `checkError` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `ActivityEnrollment_memberId_createdAt_idx`(`memberId`, `createdAt`),
    INDEX `ActivityEnrollment_activityId_createdAt_idx`(`activityId`, `createdAt`),
    INDEX `ActivityEnrollment_activityId_lots_idx`(`activityId`, `lots`),
    UNIQUE INDEX `ActivityEnrollment_activityId_memberId_key`(`activityId`, `memberId`),
    UNIQUE INDEX `ActivityEnrollment_activityId_tradeId_key`(`activityId`, `tradeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CompetitionPrize` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `activityId` INTEGER NOT NULL,
    `rankFrom` INTEGER NOT NULL,
    `rankTo` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `valueNote` TEXT NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `CompetitionPrize_activityId_sortOrder_idx`(`activityId`, `sortOrder`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RewardTier` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `key` VARCHAR(32) NOT NULL,
    `title` VARCHAR(96) NOT NULL,
    `titleEn` VARCHAR(96) NULL,
    `threshold` DECIMAL(18, 2) NOT NULL,
    `reward` VARCHAR(191) NOT NULL,
    `rewardEn` VARCHAR(191) NULL,
    `icon` VARCHAR(48) NOT NULL DEFAULT 'redeem',
    `image` TEXT NULL,
    `accent` VARCHAR(16) NOT NULL DEFAULT '#2F6FED',
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `RewardTier_key_key`(`key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RewardClaim` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `memberId` INTEGER NOT NULL,
    `kind` VARCHAR(16) NOT NULL,
    `refKey` VARCHAR(96) NOT NULL,
    `activityId` INTEGER NULL,
    `title` VARCHAR(191) NOT NULL,
    `detail` TEXT NULL,
    `status` VARCHAR(16) NOT NULL DEFAULT 'pending',
    `note` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `decidedAt` DATETIME(3) NULL,

    INDEX `RewardClaim_status_createdAt_idx`(`status`, `createdAt`),
    INDEX `RewardClaim_memberId_createdAt_idx`(`memberId`, `createdAt`),
    UNIQUE INDEX `RewardClaim_memberId_kind_refKey_key`(`memberId`, `kind`, `refKey`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BecRate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `symbol` VARCHAR(32) NOT NULL,
    `pointsPerLot` DECIMAL(12, 4) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `BecRate_symbol_key`(`symbol`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SpinPrize` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(120) NOT NULL,
    `icon` VARCHAR(48) NOT NULL DEFAULT 'redeem',
    `image` TEXT NULL,
    `weight` INTEGER NOT NULL DEFAULT 100,
    `stock` INTEGER NULL,
    `perMemberLimit` INTEGER NULL,
    `valueNote` TEXT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BecGrant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `memberId` INTEGER NOT NULL,
    `lots` DECIMAL(18, 8) NOT NULL,
    `points` DECIMAL(18, 8) NOT NULL,
    `note` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `BecGrant_memberId_createdAt_idx`(`memberId`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SpinResult` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `memberId` INTEGER NOT NULL,
    `prizeId` INTEGER NOT NULL,
    `cost` DECIMAL(18, 4) NOT NULL DEFAULT 0,
    `status` ENUM('pending', 'fulfilled', 'cancelled') NOT NULL DEFAULT 'pending',
    `spunAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fulfilledAt` DATETIME(3) NULL,
    `note` TEXT NULL,

    INDEX `SpinResult_memberId_spunAt_idx`(`memberId`, `spunAt`),
    INDEX `SpinResult_status_spunAt_idx`(`status`, `spunAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JournalAccount` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `memberId` INTEGER NOT NULL,
    `tradeAccountId` INTEGER NULL,
    `tradeId` VARCHAR(64) NOT NULL,
    `broker` VARCHAR(120) NOT NULL,
    `accountType` VARCHAR(64) NOT NULL DEFAULT 'Standard',
    `platform` VARCHAR(32) NOT NULL DEFAULT 'MetaTrader 5',
    `startingBalance` DECIMAL(18, 2) NOT NULL DEFAULT 0,
    `startDate` DATETIME(3) NOT NULL,
    `mtServer` VARCHAR(64) NULL,
    `investorPasswordEnc` TEXT NULL,
    `mtLastSyncAt` DATETIME(3) NULL,
    `mtVerifiedAt` DATETIME(3) NULL,
    `mtVerifyError` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `JournalAccount_memberId_createdAt_idx`(`memberId`, `createdAt`),
    UNIQUE INDEX `JournalAccount_memberId_tradeAccountId_key`(`memberId`, `tradeAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JournalTrade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `accountId` INTEGER NOT NULL,
    `externalKey` VARCHAR(191) NULL,
    `ticket` VARCHAR(64) NULL,
    `symbol` VARCHAR(32) NOT NULL,
    `side` VARCHAR(8) NOT NULL,
    `openAt` DATETIME(3) NOT NULL,
    `closeAt` DATETIME(3) NULL,
    `openPrice` DECIMAL(18, 5) NOT NULL,
    `closePrice` DECIMAL(18, 5) NULL,
    `tp` DECIMAL(18, 5) NULL,
    `sl` DECIMAL(18, 5) NULL,
    `lots` DECIMAL(18, 2) NOT NULL,
    `pnl` DECIMAL(18, 2) NULL,
    `commission` DECIMAL(18, 2) NOT NULL DEFAULT 0,
    `swap` DECIMAL(18, 2) NOT NULL DEFAULT 0,
    `note` TEXT NULL,
    `tagsJson` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `JournalTrade_externalKey_key`(`externalKey`),
    INDEX `JournalTrade_accountId_closeAt_idx`(`accountId`, `closeAt`),
    INDEX `JournalTrade_accountId_openAt_idx`(`accountId`, `openAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RiskRule` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `accountId` INTEGER NOT NULL,
    `maxDailyLoss` DECIMAL(18, 2) NOT NULL DEFAULT 250,
    `maxLoss` DECIMAL(18, 2) NOT NULL DEFAULT 500,
    `profitTarget` DECIMAL(18, 2) NOT NULL DEFAULT 400,
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `RiskRule_accountId_key`(`accountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SocialAccount` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `memberId` INTEGER NOT NULL,
    `provider` VARCHAR(16) NOT NULL,
    `providerUserId` VARCHAR(96) NOT NULL,
    `username` VARCHAR(191) NULL,
    `verifiedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `SocialAccount_memberId_provider_idx`(`memberId`, `provider`),
    UNIQUE INDEX `SocialAccount_memberId_provider_key`(`memberId`, `provider`),
    UNIQUE INDEX `SocialAccount_provider_providerUserId_key`(`provider`, `providerUserId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MemberNotificationRead` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `memberId` INTEGER NOT NULL,
    `key` VARCHAR(96) NOT NULL,
    `readAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `MemberNotificationRead_memberId_readAt_idx`(`memberId`, `readAt`),
    UNIQUE INDEX `MemberNotificationRead_memberId_key_key`(`memberId`, `key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Course` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(64) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `category` VARCHAR(32) NOT NULL DEFAULT 'beginner',
    `level` ENUM('beginner', 'intermediate', 'advanced') NOT NULL DEFAULT 'beginner',
    `minLevel` ENUM('basic', 'standard', 'premium') NOT NULL DEFAULT 'basic',
    `coverImage` TEXT NULL,
    `instructor` VARCHAR(120) NULL,
    `durationMin` INTEGER NOT NULL DEFAULT 0,
    `published` BOOLEAN NOT NULL DEFAULT true,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Course_slug_key`(`slug`),
    INDEX `Course_published_sortOrder_idx`(`published`, `sortOrder`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CourseLesson` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `courseId` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `sectionTitle` VARCHAR(191) NULL,
    `videoId` VARCHAR(64) NULL,
    `videoStart` INTEGER NOT NULL DEFAULT 0,
    `videoEnd` INTEGER NULL,
    `durationMin` INTEGER NOT NULL DEFAULT 0,
    `script` TEXT NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `isPreview` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `CourseLesson_courseId_sortOrder_idx`(`courseId`, `sortOrder`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CourseEnrollment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `courseId` INTEGER NOT NULL,
    `memberId` INTEGER NOT NULL,
    `startedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `completedAt` DATETIME(3) NULL,

    INDEX `CourseEnrollment_memberId_startedAt_idx`(`memberId`, `startedAt`),
    UNIQUE INDEX `CourseEnrollment_courseId_memberId_key`(`courseId`, `memberId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LessonProgress` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lessonId` INTEGER NOT NULL,
    `memberId` INTEGER NOT NULL,
    `completedAt` DATETIME(3) NULL,
    `maxPositionSec` INTEGER NOT NULL DEFAULT 0,
    `durationSec` INTEGER NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `LessonProgress_memberId_completedAt_idx`(`memberId`, `completedAt`),
    UNIQUE INDEX `LessonProgress_lessonId_memberId_key`(`lessonId`, `memberId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MemberClaimToken` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `memberId` INTEGER NOT NULL,
    `tokenHash` VARCHAR(64) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `usedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `MemberClaimToken_tokenHash_key`(`tokenHash`),
    INDEX `MemberClaimToken_memberId_usedAt_idx`(`memberId`, `usedAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AdminClaimToken` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `adminId` INTEGER NOT NULL,
    `tokenHash` VARCHAR(64) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `usedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `AdminClaimToken_tokenHash_key`(`tokenHash`),
    INDEX `AdminClaimToken_adminId_usedAt_idx`(`adminId`, `usedAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LeaderboardAvatarOption` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(96) NOT NULL,
    `imageUrl` VARCHAR(255) NULL,
    `imageData` MEDIUMTEXT NULL,
    `builtIn` BOOLEAN NOT NULL DEFAULT false,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `LeaderboardAvatarOption_active_sortOrder_idx`(`active`, `sortOrder`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NewsArticle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `category` VARCHAR(32) NOT NULL,
    `excerpt` TEXT NOT NULL,
    `heroImage` TEXT NOT NULL,
    `sourceUrl` TEXT NULL,
    `contentJson` LONGTEXT NOT NULL,
    `published` BOOLEAN NOT NULL DEFAULT true,
    `section` VARCHAR(16) NOT NULL DEFAULT 'blog',
    `topic` VARCHAR(32) NULL,
    `pinned` BOOLEAN NOT NULL DEFAULT false,
    `publishedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `NewsArticle_slug_key`(`slug`),
    INDEX `NewsArticle_published_publishedAt_idx`(`published`, `publishedAt`),
    INDEX `NewsArticle_section_published_publishedAt_idx`(`section`, `published`, `publishedAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NewsletterSubscriber` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `source` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `NewsletterSubscriber_email_key`(`email`),
    INDEX `NewsletterSubscriber_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SpdrDaily` (
    `tradeDate` DATE NOT NULL,
    `closingPrice` DECIMAL(14, 4) NULL,
    `ouncesPerShare` DECIMAL(14, 8) NULL,
    `navPerShare` DECIMAL(14, 6) NULL,
    `indicativePrice` DECIMAL(14, 4) NULL,
    `midPrice` DECIMAL(14, 4) NULL,
    `premiumDiscountPct` DECIMAL(10, 4) NULL,
    `dailyShareVolume` BIGINT NULL,
    `totalOunces` DECIMAL(18, 2) NOT NULL,
    `tonnes` DECIMAL(12, 2) NOT NULL,
    `totalNavUsd` DECIMAL(20, 2) NULL,
    `fetchedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`tradeDate`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GoldDaily` (
    `tradeDate` DATE NOT NULL,
    `close` DECIMAL(12, 4) NOT NULL,
    `source` VARCHAR(32) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`tradeDate`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SpdrAnalytics` (
    `tradeDate` DATE NOT NULL,
    `holdingsTonnes` DOUBLE NOT NULL,
    `holdingsChangeTonnes` DOUBLE NULL,
    `holdingsChangePct` DOUBLE NULL,
    `flow3d` DOUBLE NULL,
    `flow7d` DOUBLE NULL,
    `flow14d` DOUBLE NULL,
    `flow30d` DOUBLE NULL,
    `flow90d` DOUBLE NULL,
    `flowYtd` DOUBLE NULL,
    `flowVelocity7d` DOUBLE NULL,
    `flowAcceleration` DOUBLE NULL,
    `flowZscore252` DOUBLE NULL,
    `flowPercentileAll` DOUBLE NULL,
    `flowPercentile5y` DOUBLE NULL,
    `inflowStreak` INTEGER NOT NULL DEFAULT 0,
    `outflowStreak` INTEGER NOT NULL DEFAULT 0,
    `streakDirection` VARCHAR(8) NOT NULL,
    `streakAccumulatedFlow` DOUBLE NOT NULL DEFAULT 0,
    `holdingsPercentileAll` DOUBLE NULL,
    `holdingsPercentile5y` DOUBLE NULL,
    `holdings52wHigh` DOUBLE NULL,
    `holdings52wLow` DOUBLE NULL,
    `holdingsDistance52wHighPct` DOUBLE NULL,
    `holdingsDistance52wLowPct` DOUBLE NULL,
    `goldClose` DOUBLE NULL,
    `goldReturn1d` DOUBLE NULL,
    `goldReturn3d` DOUBLE NULL,
    `goldReturn7d` DOUBLE NULL,
    `goldReturn14d` DOUBLE NULL,
    `goldReturn30d` DOUBLE NULL,
    `spdrChange14dPct` DOUBLE NULL,
    `divergence7d` DOUBLE NULL,
    `divergence14d` DOUBLE NULL,
    `divergence30d` DOUBLE NULL,
    `divergenceType14d` VARCHAR(24) NULL,
    `flow7dScore` DOUBLE NULL,
    `flow30dScore` DOUBLE NULL,
    `streakScore` DOUBLE NULL,
    `accelerationScore` DOUBLE NULL,
    `momentumScore` DOUBLE NULL,
    `momentumLabel` VARCHAR(24) NULL,
    `regimeScore` DOUBLE NULL,
    `regimeLabel` VARCHAR(32) NULL,
    `analyticsVersion` VARCHAR(16) NOT NULL,
    `calculatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`tradeDate`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SpdrSyncRun` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `trigger` VARCHAR(16) NOT NULL,
    `status` VARCHAR(16) NOT NULL,
    `startedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `finishedAt` DATETIME(3) NULL,
    `rowsRead` INTEGER NOT NULL DEFAULT 0,
    `rowsInserted` INTEGER NOT NULL DEFAULT 0,
    `rowsUpdated` INTEGER NOT NULL DEFAULT 0,
    `latestTradeDate` DATE NULL,
    `error` TEXT NULL,

    INDEX `SpdrSyncRun_startedAt_idx`(`startedAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Member` ADD CONSTRAINT `Member_primaryTradeAccountId_fkey` FOREIGN KEY (`primaryTradeAccountId`) REFERENCES `TradeAccount`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MemberAcquisitionChannel` ADD CONSTRAINT `MemberAcquisitionChannel_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TradeAccount` ADD CONSTRAINT `TradeAccount_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TradeAccount` ADD CONSTRAINT `TradeAccount_brokerId_fkey` FOREIGN KEY (`brokerId`) REFERENCES `Broker`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TradeLog` ADD CONSTRAINT `TradeLog_tradeAccountId_fkey` FOREIGN KEY (`tradeAccountId`) REFERENCES `TradeAccount`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TradeLog` ADD CONSTRAINT `TradeLog_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlanIndicatorEntitlement` ADD CONSTRAINT `PlanIndicatorEntitlement_indicatorId_fkey` FOREIGN KEY (`indicatorId`) REFERENCES `Indicator`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MemberIndicatorAccess` ADD CONSTRAINT `MemberIndicatorAccess_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MemberIndicatorAccess` ADD CONSTRAINT `MemberIndicatorAccess_indicatorId_fkey` FOREIGN KEY (`indicatorId`) REFERENCES `Indicator`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RenewalRecord` ADD CONSTRAINT `RenewalRecord_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RenewalRecord` ADD CONSTRAINT `RenewalRecord_indicatorId_fkey` FOREIGN KEY (`indicatorId`) REFERENCES `Indicator`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RenewalRecord` ADD CONSTRAINT `RenewalRecord_indicatorAccessId_fkey` FOREIGN KEY (`indicatorAccessId`) REFERENCES `MemberIndicatorAccess`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TelegramAccess` ADD CONSTRAINT `TelegramAccess_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LotCheckRun` ADD CONSTRAINT `LotCheckRun_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LotCheckRun` ADD CONSTRAINT `LotCheckRun_tradeAccountId_fkey` FOREIGN KEY (`tradeAccountId`) REFERENCES `TradeAccount`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LotCheckResult` ADD CONSTRAINT `LotCheckResult_runId_fkey` FOREIGN KEY (`runId`) REFERENCES `LotCheckRun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActivityLog` ADD CONSTRAINT `ActivityLog_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActivityEnrollment` ADD CONSTRAINT `ActivityEnrollment_activityId_fkey` FOREIGN KEY (`activityId`) REFERENCES `Activity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActivityEnrollment` ADD CONSTRAINT `ActivityEnrollment_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActivityEnrollment` ADD CONSTRAINT `ActivityEnrollment_tradeAccountId_fkey` FOREIGN KEY (`tradeAccountId`) REFERENCES `TradeAccount`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CompetitionPrize` ADD CONSTRAINT `CompetitionPrize_activityId_fkey` FOREIGN KEY (`activityId`) REFERENCES `Activity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RewardClaim` ADD CONSTRAINT `RewardClaim_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RewardClaim` ADD CONSTRAINT `RewardClaim_activityId_fkey` FOREIGN KEY (`activityId`) REFERENCES `Activity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BecGrant` ADD CONSTRAINT `BecGrant_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SpinResult` ADD CONSTRAINT `SpinResult_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SpinResult` ADD CONSTRAINT `SpinResult_prizeId_fkey` FOREIGN KEY (`prizeId`) REFERENCES `SpinPrize`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JournalAccount` ADD CONSTRAINT `JournalAccount_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JournalAccount` ADD CONSTRAINT `JournalAccount_tradeAccountId_fkey` FOREIGN KEY (`tradeAccountId`) REFERENCES `TradeAccount`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JournalTrade` ADD CONSTRAINT `JournalTrade_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `JournalAccount`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RiskRule` ADD CONSTRAINT `RiskRule_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `JournalAccount`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SocialAccount` ADD CONSTRAINT `SocialAccount_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MemberNotificationRead` ADD CONSTRAINT `MemberNotificationRead_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CourseLesson` ADD CONSTRAINT `CourseLesson_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CourseEnrollment` ADD CONSTRAINT `CourseEnrollment_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CourseEnrollment` ADD CONSTRAINT `CourseEnrollment_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LessonProgress` ADD CONSTRAINT `LessonProgress_lessonId_fkey` FOREIGN KEY (`lessonId`) REFERENCES `CourseLesson`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LessonProgress` ADD CONSTRAINT `LessonProgress_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MemberClaimToken` ADD CONSTRAINT `MemberClaimToken_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AdminClaimToken` ADD CONSTRAINT `AdminClaimToken_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

