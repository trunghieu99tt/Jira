import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1642951595443 implements MigrationInterface {
  name = 'CreateTables1642951595443';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`comments\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`content\` varchar(255) NULL,
                \`file\` varchar(255) NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`authorId\` bigint NULL,
                \`boardId\` int NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE \`users\` (
                \`id\` bigint NOT NULL AUTO_INCREMENT,
                \`username\` varchar(255) NOT NULL,
                \`password\` varchar(255) NOT NULL,
                \`email\` varchar(255) NOT NULL,
                \`name\` varchar(255) NOT NULL,
                \`avatar\` varchar(255) NOT NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE \`board_users\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`role\` enum ('0', '1') NOT NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`userId\` bigint NULL,
                \`boardId\` int NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE \`boards\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NOT NULL,
                \`cover_photo\` varchar(255) NOT NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`ownerId\` bigint NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE \`board_list\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NOT NULL,
                \`boardId\` int NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE \`tasks\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NOT NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`reportedById\` int NULL,
                \`assignedToId\` int NULL,
                \`boardListId\` int NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE \`attachments\` (
                \`id\` bigint NOT NULL AUTO_INCREMENT,
                \`file\` varchar(255) NOT NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`taskId\` int NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            ALTER TABLE \`comments\`
            ADD CONSTRAINT \`FK_4548cc4a409b8651ec75f70e280\` FOREIGN KEY (\`authorId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`comments\`
            ADD CONSTRAINT \`FK_4df5e6b25c85544e99a195c9c71\` FOREIGN KEY (\`boardId\`) REFERENCES \`boards\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`board_users\`
            ADD CONSTRAINT \`FK_4b4a83ddc55c41f973366cd9963\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`board_users\`
            ADD CONSTRAINT \`FK_a249a9aefb18b88a858dead7627\` FOREIGN KEY (\`boardId\`) REFERENCES \`boards\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`boards\`
            ADD CONSTRAINT \`FK_dcdf669d9c6727190556702de56\` FOREIGN KEY (\`ownerId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`board_list\`
            ADD CONSTRAINT \`FK_2dd7d03436e4e09ab5762b3c696\` FOREIGN KEY (\`boardId\`) REFERENCES \`boards\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`tasks\`
            ADD CONSTRAINT \`FK_dae518c39d2fa5a61d1ddfc702c\` FOREIGN KEY (\`reportedById\`) REFERENCES \`board_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`tasks\`
            ADD CONSTRAINT \`FK_d020677feafe94eba0cb9d846d1\` FOREIGN KEY (\`assignedToId\`) REFERENCES \`board_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`tasks\`
            ADD CONSTRAINT \`FK_aa58d855a2bc4dbe19797f8523c\` FOREIGN KEY (\`boardListId\`) REFERENCES \`board_list\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`attachments\`
            ADD CONSTRAINT \`FK_65152e15d915ebe1294160bd1d3\` FOREIGN KEY (\`taskId\`) REFERENCES \`tasks\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`attachments\` DROP FOREIGN KEY \`FK_65152e15d915ebe1294160bd1d3\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_aa58d855a2bc4dbe19797f8523c\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_d020677feafe94eba0cb9d846d1\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_dae518c39d2fa5a61d1ddfc702c\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`board_list\` DROP FOREIGN KEY \`FK_2dd7d03436e4e09ab5762b3c696\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`boards\` DROP FOREIGN KEY \`FK_dcdf669d9c6727190556702de56\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`board_users\` DROP FOREIGN KEY \`FK_a249a9aefb18b88a858dead7627\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`board_users\` DROP FOREIGN KEY \`FK_4b4a83ddc55c41f973366cd9963\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_4df5e6b25c85544e99a195c9c71\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_4548cc4a409b8651ec75f70e280\`
        `);
    await queryRunner.query(`
            DROP TABLE \`attachments\`
        `);
    await queryRunner.query(`
            DROP TABLE \`tasks\`
        `);
    await queryRunner.query(`
            DROP TABLE \`board_list\`
        `);
    await queryRunner.query(`
            DROP TABLE \`boards\`
        `);
    await queryRunner.query(`
            DROP TABLE \`board_users\`
        `);
    await queryRunner.query(`
            DROP TABLE \`users\`
        `);
    await queryRunner.query(`
            DROP TABLE \`comments\`
        `);
  }
}
