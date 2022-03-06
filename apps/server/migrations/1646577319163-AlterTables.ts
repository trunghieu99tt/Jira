import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTables1646577319163 implements MigrationInterface {
  name = 'AlterTables1646577319163';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`attachments\` DROP FOREIGN KEY \`FK_65152e15d915ebe1294160bd1d3\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`boards\` DROP FOREIGN KEY \`FK_074efe1a079786d8c076bf00fff\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_4548cc4a409b8651ec75f70e280\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_4df5e6b25c85544e99a195c9c71\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`project_users\` DROP FOREIGN KEY \`FK_1905d9d76173d09c07ba1f0cd84\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`project_users\` DROP FOREIGN KEY \`FK_6ebc83af455ff1ed9573c823e23\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`projects\` DROP FOREIGN KEY \`FK_a8e7e6c3f9d9528ed35fe5bae33\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_8a75fdea98c72c539a0879cb0d1\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_d020677feafe94eba0cb9d846d1\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_dae518c39d2fa5a61d1ddfc702c\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_e08fca67ca8966e6b9914bf2956\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`attachments\` CHANGE \`taskId\` \`task_id\` int NULL
        `);
    await queryRunner.query(`
            ALTER TABLE \`users\` CHANGE \`avatar\` \`avatar_file_id\` varchar(255) NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE \`boards\` DROP COLUMN \`projectId\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`comments\` DROP COLUMN \`authorId\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`comments\` DROP COLUMN \`boardId\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`comments\` DROP COLUMN \`file\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`project_users\` DROP COLUMN \`projectId\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`project_users\` DROP COLUMN \`userId\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`projects\` DROP COLUMN \`cover_photo\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`projects\` DROP COLUMN \`ownerId\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`tasks\` DROP COLUMN \`assignedToId\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`tasks\` DROP COLUMN \`boardId\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`tasks\` DROP COLUMN \`projectId\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`tasks\` DROP COLUMN \`reportedById\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`boards\`
            ADD \`project_id\` bigint NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE \`boards\`
            ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
        `);
    await queryRunner.query(`
            ALTER TABLE \`boards\`
            ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
        `);
    await queryRunner.query(`
            ALTER TABLE \`comments\`
            ADD \`user_id\` bigint NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE \`comments\`
            ADD \`board_id\` bigint NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE \`project_users\`
            ADD \`project_id\` bigint NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE \`project_users\`
            ADD \`user_id\` bigint NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE \`projects\`
            ADD \`cover_photo_file_id\` bigint NULL
        `);
    await queryRunner.query(`
            ALTER TABLE \`projects\`
            ADD \`owner_user_id\` bigint NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE \`tasks\`
            ADD \`reporter_user_id\` bigint NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE \`tasks\`
            ADD \`assignee_user_id\` bigint NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE \`tasks\`
            ADD \`project_id\` bigint NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE \`tasks\`
            ADD \`board_id\` bigint NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE \`attachments\` DROP COLUMN \`task_id\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`attachments\`
            ADD \`task_id\` bigint NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE \`project_users\` CHANGE \`id\` \`id\` int NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE \`project_users\` DROP PRIMARY KEY
        `);
    await queryRunner.query(`
            ALTER TABLE \`project_users\` DROP COLUMN \`id\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`project_users\`
            ADD \`id\` bigint NOT NULL PRIMARY KEY AUTO_INCREMENT
        `);
    await queryRunner.query(`
            ALTER TABLE \`project_users\` DROP COLUMN \`role\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`project_users\`
            ADD \`role\` int NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE \`projects\` CHANGE \`id\` \`id\` int NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE \`projects\` DROP PRIMARY KEY
        `);
    await queryRunner.query(`
            ALTER TABLE \`projects\` DROP COLUMN \`id\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`projects\`
            ADD \`id\` bigint NOT NULL PRIMARY KEY AUTO_INCREMENT
        `);
    await queryRunner.query(`
            ALTER TABLE \`users\` DROP COLUMN \`avatar_file_id\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD \`avatar_file_id\` int NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`users\` DROP COLUMN \`avatar_file_id\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD \`avatar_file_id\` varchar(255) NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE \`projects\` DROP COLUMN \`id\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`projects\`
            ADD \`id\` int NOT NULL AUTO_INCREMENT
        `);
    await queryRunner.query(`
            ALTER TABLE \`projects\`
            ADD PRIMARY KEY (\`id\`)
        `);
    await queryRunner.query(`
            ALTER TABLE \`projects\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT
        `);
    await queryRunner.query(`
            ALTER TABLE \`project_users\` DROP COLUMN \`role\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`project_users\`
            ADD \`role\` enum ('0', '1') NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE \`project_users\` DROP COLUMN \`id\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`project_users\`
            ADD \`id\` int NOT NULL AUTO_INCREMENT
        `);
    await queryRunner.query(`
            ALTER TABLE \`project_users\`
            ADD PRIMARY KEY (\`id\`)
        `);
    await queryRunner.query(`
            ALTER TABLE \`project_users\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT
        `);
    await queryRunner.query(`
            ALTER TABLE \`attachments\` DROP COLUMN \`task_id\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`attachments\`
            ADD \`task_id\` int NULL
        `);
    await queryRunner.query(`
            ALTER TABLE \`tasks\` DROP COLUMN \`board_id\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`tasks\` DROP COLUMN \`project_id\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`tasks\` DROP COLUMN \`assignee_user_id\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`tasks\` DROP COLUMN \`reporter_user_id\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`projects\` DROP COLUMN \`owner_user_id\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`projects\` DROP COLUMN \`cover_photo_file_id\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`project_users\` DROP COLUMN \`user_id\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`project_users\` DROP COLUMN \`project_id\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`comments\` DROP COLUMN \`board_id\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`comments\` DROP COLUMN \`user_id\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`boards\` DROP COLUMN \`updated_at\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`boards\` DROP COLUMN \`created_at\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`boards\` DROP COLUMN \`project_id\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`tasks\`
            ADD \`reportedById\` int NULL
        `);
    await queryRunner.query(`
            ALTER TABLE \`tasks\`
            ADD \`projectId\` int NULL
        `);
    await queryRunner.query(`
            ALTER TABLE \`tasks\`
            ADD \`boardId\` int NULL
        `);
    await queryRunner.query(`
            ALTER TABLE \`tasks\`
            ADD \`assignedToId\` int NULL
        `);
    await queryRunner.query(`
            ALTER TABLE \`projects\`
            ADD \`ownerId\` bigint NULL
        `);
    await queryRunner.query(`
            ALTER TABLE \`projects\`
            ADD \`cover_photo\` int NULL
        `);
    await queryRunner.query(`
            ALTER TABLE \`project_users\`
            ADD \`userId\` bigint NULL
        `);
    await queryRunner.query(`
            ALTER TABLE \`project_users\`
            ADD \`projectId\` int NULL
        `);
    await queryRunner.query(`
            ALTER TABLE \`comments\`
            ADD \`file\` varchar(255) NULL
        `);
    await queryRunner.query(`
            ALTER TABLE \`comments\`
            ADD \`boardId\` int NULL
        `);
    await queryRunner.query(`
            ALTER TABLE \`comments\`
            ADD \`authorId\` bigint NULL
        `);
    await queryRunner.query(`
            ALTER TABLE \`boards\`
            ADD \`projectId\` int NULL
        `);
    await queryRunner.query(`
            ALTER TABLE \`users\` CHANGE \`avatar_file_id\` \`avatar\` varchar(255) NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE \`attachments\` CHANGE \`task_id\` \`taskId\` int NULL
        `);
    await queryRunner.query(`
            ALTER TABLE \`tasks\`
            ADD CONSTRAINT \`FK_e08fca67ca8966e6b9914bf2956\` FOREIGN KEY (\`projectId\`) REFERENCES \`projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
            ADD CONSTRAINT \`FK_8a75fdea98c72c539a0879cb0d1\` FOREIGN KEY (\`boardId\`) REFERENCES \`boards\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`projects\`
            ADD CONSTRAINT \`FK_a8e7e6c3f9d9528ed35fe5bae33\` FOREIGN KEY (\`ownerId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
            ADD CONSTRAINT \`FK_4df5e6b25c85544e99a195c9c71\` FOREIGN KEY (\`boardId\`) REFERENCES \`projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`comments\`
            ADD CONSTRAINT \`FK_4548cc4a409b8651ec75f70e280\` FOREIGN KEY (\`authorId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`boards\`
            ADD CONSTRAINT \`FK_074efe1a079786d8c076bf00fff\` FOREIGN KEY (\`projectId\`) REFERENCES \`projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`attachments\`
            ADD CONSTRAINT \`FK_65152e15d915ebe1294160bd1d3\` FOREIGN KEY (\`taskId\`) REFERENCES \`tasks\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }
}
