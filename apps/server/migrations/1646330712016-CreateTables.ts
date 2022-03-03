import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1646330712016 implements MigrationInterface {
  name = 'CreateTables1646330712016';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`project_users\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`role\` enum ('0', '1') NOT NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`userId\` bigint NULL,
                \`projectId\` int NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
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
            CREATE TABLE \`projects\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NOT NULL,
                \`cover_photo\` varchar(255) NOT NULL,
                \`privacy\` enum ('0', '1') NOT NULL,
                \`description\` varchar(255) NOT NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`ownerId\` bigint NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE \`boards\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NOT NULL,
                \`projectId\` int NULL,
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
                \`projectId\` int NULL,
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
            ALTER TABLE \`project_users\`
            ADD CONSTRAINT \`FK_6ebc83af455ff1ed9573c823e23\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`project_users\`
            ADD CONSTRAINT \`FK_1905d9d76173d09c07ba1f0cd84\` FOREIGN KEY (\`projectId\`) REFERENCES \`projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`comments\`
            ADD CONSTRAINT \`FK_4548cc4a409b8651ec75f70e280\` FOREIGN KEY (\`authorId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`comments\`
            ADD CONSTRAINT \`FK_4df5e6b25c85544e99a195c9c71\` FOREIGN KEY (\`boardId\`) REFERENCES \`projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`projects\`
            ADD CONSTRAINT \`FK_a8e7e6c3f9d9528ed35fe5bae33\` FOREIGN KEY (\`ownerId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`boards\`
            ADD CONSTRAINT \`FK_074efe1a079786d8c076bf00fff\` FOREIGN KEY (\`projectId\`) REFERENCES \`projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`tasks\`
            ADD CONSTRAINT \`FK_dae518c39d2fa5a61d1ddfc702c\` FOREIGN KEY (\`reportedById\`) REFERENCES \`project_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`tasks\`
            ADD CONSTRAINT \`FK_d020677feafe94eba0cb9d846d1\` FOREIGN KEY (\`assignedToId\`) REFERENCES \`project_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`tasks\`
            ADD CONSTRAINT \`FK_e08fca67ca8966e6b9914bf2956\` FOREIGN KEY (\`projectId\`) REFERENCES \`projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`tasks\`
            ADD CONSTRAINT \`FK_aa58d855a2bc4dbe19797f8523c\` FOREIGN KEY (\`boardListId\`) REFERENCES \`boards\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
            ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_e08fca67ca8966e6b9914bf2956\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_d020677feafe94eba0cb9d846d1\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_dae518c39d2fa5a61d1ddfc702c\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`boards\` DROP FOREIGN KEY \`FK_074efe1a079786d8c076bf00fff\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`projects\` DROP FOREIGN KEY \`FK_a8e7e6c3f9d9528ed35fe5bae33\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_4df5e6b25c85544e99a195c9c71\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_4548cc4a409b8651ec75f70e280\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`project_users\` DROP FOREIGN KEY \`FK_1905d9d76173d09c07ba1f0cd84\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`project_users\` DROP FOREIGN KEY \`FK_6ebc83af455ff1ed9573c823e23\`
        `);
    await queryRunner.query(`
            DROP TABLE \`attachments\`
        `);
    await queryRunner.query(`
            DROP TABLE \`tasks\`
        `);
    await queryRunner.query(`
            DROP TABLE \`boards\`
        `);
    await queryRunner.query(`
            DROP TABLE \`projects\`
        `);
    await queryRunner.query(`
            DROP TABLE \`users\`
        `);
    await queryRunner.query(`
            DROP TABLE \`comments\`
        `);
    await queryRunner.query(`
            DROP TABLE \`project_users\`
        `);
  }
}
